const IsEmpty = arg => {
	if (arg == null || arg == undefined || arg == '') {
		return true;
	} else {
		if (typeof arg == 'string' && arg.trim() == '') {
			return true;
		}
		if (typeof arg == 'number' && isNaN(arg)) {
			return true;
		}
	}
	return false;
};

const IsNotEmpty = arg => {
	return !IsEmpty(arg);
};

const IsDate = date => {
	var type = typeof date;
	if (type == 'string' || type == 'number') {
		if (isNaN(date) && !isNaN(Date.parse(date))) {
			return true;
		}
	}
	if (type == 'object') {
		if (date instanceof Date) {
			return true;
		}
	}
	return false;
};

const IsObject = arg => {
	if (arg != null && arg != undefined) {
		if (typeof arg == 'object' && Object.keys(arg).length > 0) {
			return true;
		}
	}
	return false;
};

const extend = (obj1, obj2) => {
	if (IsObject(obj1) && IsObject(obj2)) {
		const keys = Object.keys(obj1);
		keys.forEach((item, index) => {
			obj1[item] = obj2[item] == undefined ? obj1[item] : obj2[item];
		});
		return obj1;
	}
	console.error('the type of every param must be object');
	return obj1;
};

const DeepClone = obj => {
	var res;
	switch (typeof obj) {
		case 'string':
		case 'number':
		case 'boolean':
		case 'undefined':
			res = obj;
			break;
		case 'object':
			if (Array.isArray(obj)) {
				res = obj.filter(t => true);
			} else if (obj instanceof Date) {
				res = obj;
			} else if (obj == null) {
				res = null;
			} else {
				var _obj = {};
				for (let key in obj) {
					_obj[key] = DeepClone(obj[key]);
				}
				res = _obj;
			}
			break;
		case 'function':
			res = eval(obj.toString());
			break;
	}
	return res;
};

const DateParse = str => {
	if (isNaN(data) && !isNaN(Date.parse(str))) {
		return new Date(str).Format();
	}
	return '';
};

const ContainStr = (arg, sub) => {
	if (!IsEmpty(arg)) {
		return arg.indexOf(sub) != -1;
	}
	return false;
};

const FormatDate = (date, fmt = 'yyyy-MM-dd hh:mm:ss') => {
	if (IsDate(date)) {
		var o = {
			'M+': date.getMonth() + 1, //月份
			'd+': date.getDate(), //日
			'h+': date.getHours(), //小时
			'm+': date.getMinutes(), //分
			's+': date.getSeconds(), //秒
			'q+': Math.floor((date.getMonth() + 3) / 3), //季度
			S: date.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
		for (var k in o) {
			if (new RegExp('(' + k + ')').test(fmt)) {
				fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
			}
		}
		return fmt;
	}
	console.error(`the type is not 'Date' of ${date}`);
	return '';
};

const DiffDate = (date1, date2) => {
	if (IsDate(date1) && IsDate(date2)) {
		return Math.ceil((date1 - date) / (1000 * 60 * 60 * 24));
	}
	console.error('Exist the type is not Date of args');
	return 0;
};

const AddDays = (date, days) => {
	if (IsDate(date)) {
		return new Date(date.getTime() + days * (1000 * 60 * 60 * 24));
	}
	console.error(`the type is not 'Date' of ${date}`);
	return '';
};

const AddMonths = (date, months) => {
	if (IsDate(date)) {
		var time = FormatDate(date, 'hh:mm:ss');
		var day = date.getDate();
		var month = date.getMonth() + 1;
		var year = date.getFullYear();
		month += months;
		if (month > 12) {
			year += Math.floor(month / 12);
			month = month % 12;
		}
		return DateParse(`${year}-${month}-${day} ${time}`);
	}
	console.error(`the type is not 'Date' of ${date}`);
	return '';
};

const ClearArr = arr => {
	arr.splice(0, this.length);
};

const ContainsEl = (arr, el) => {
	for (i = 0; i < this.length; i++) {
		if (JSON.stringify(this[i]) == JSON.stringify(el)) {
			return true;
		}
	}
	return false;
};

/***** 格式化XML数据 *****/
const FormatXml = xmlStr => {
	if (IsEmpty(xmlStr)) {
		return '';
	}
	text = xmlStr;
	//使用replace去空格
	text =
		'\n' +
		text
			.replace(/(<\w+)(\s.*?>)/g, function($0, name, props) {
				return name + ' ' + props.replace(/\s+(\w+=)/g, ' $1');
			})
			.replace(/>\s*?</g, '>\n<');
	//处理注释
	text = text
		.replace(/\n/g, '\r')
		.replace(/<!--(.+?)-->/g, function($0, text) {
			var ret = '<!--' + escape(text) + '-->';
			return ret;
		})
		.replace(/\r/g, '\n');
	//调整格式  以压栈方式递归调整缩进
	var rgx = /\n(<(([^\?]).+?)(?:\s|\s*?>|\s*?(\/)>)(?:.*?(?:(?:(\/)>)|(?:<(\/)\2>)))?)/gm;
	var nodeStack = [];
	var output = text.replace(rgx, function($0, all, name, isBegin, isCloseFull1, isCloseFull2, isFull1, isFull2) {
		var isClosed = isCloseFull1 == '/' || isCloseFull2 == '/' || isFull1 == '/' || isFull2 == '/';
		var prefix = '';
		if (isBegin == '!') {
			//!开头
			prefix = setPrefix(nodeStack.length);
		} else {
			if (isBegin != '/') {
				///开头
				prefix = setPrefix(nodeStack.length);
				if (!isClosed) {
					//非关闭标签
					nodeStack.push(name);
				}
			} else {
				nodeStack.pop(); //弹栈
				prefix = setPrefix(nodeStack.length);
			}
		}
		var ret = '\n' + prefix + all;
		return ret;
	});
	var prefixSpace = -1;
	var outputText = output.substring(1);
	//还原注释内容
	outputText = outputText.replace(/\n/g, '\r').replace(/(\s*)<!--(.+?)-->/g, function($0, prefix, text) {
		if (prefix.charAt(0) == '\r') prefix = prefix.substring(1);
		text = unescape(text).replace(/\r/g, '\n');
		var ret = '\n' + prefix + '<!--' + text.replace(/^\s*/gm, prefix) + '-->';
		return ret;
	});
	outputText = outputText.replace(/\s+$/g, '').replace(/\r/g, '\r\n');
	return outputText;
};

//计算头函数 用来缩进
const setPrefix = prefixIndex => {
	var result = '';
	var span = '    '; //缩进长度
	var output = [];
	for (var i = 0; i < prefixIndex; ++i) {
		output.push(span);
	}
	result = output.join('');
	return result;
};
/***** 格式化XML数据 *****/

/***** 格式化表格Sort字段 *****/
const StuffSort = sortArr => {
	var res = '';
	if (IsNotEmpty(sortArr) && sortArr.length > 0) {
		sortArr.forEach((item, index) => {
			res = `${res} ${item.property} ${item.order} ${index == sortArr.length - 1 ? '' : ','} `;
		});
	}
	return res;
};
/***** 格式化表格Sort字段 *****/
