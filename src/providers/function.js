const commonfunction = {
    unitConvert(num) {
        var moneyUnits = ["m", "km"]
        var dividend = 1000;
        var curentNum = num;
        //转换数字 
        var curentUnit = moneyUnits[0];
        //转换单位 
        if ([undefined, '', null, 'undefined'].includes(curentNum)) {
            return '0m'
        }
        for (var i = 0; i < 2; i++) {
            curentUnit = moneyUnits[i]
            if (i == 1) { break }
            if (commonfunction.strNumSize(curentNum) < 4) {
                break;
            }
            curentNum = curentNum / dividend
        }
        let m = Number(curentNum).toFixed(2) + curentUnit
        return m;
    },
    strNumSize(tempNum) {
        var stringNum = tempNum.toString()
        var index = stringNum.indexOf(".")
        var newNum = stringNum;
        if (index != -1) {
            newNum = stringNum.substring(0, index)
        }
        return newNum.length
    },
    cityhandle(code, tpye) {
        if (tpye == 'city') {
            return code.slice(0, 4) + '00'
        }
    },
    municipality(address) {
        let pname = (address.adcode).slice(0, 2);
        let obj
        switch (pname) {
            case '50'://重庆
                obj = {
                    province: {
                        name: address.province,
                        code: Number((address.adcode).slice(0, 2)) * 10000
                    },
                    city: {
                        name: '重庆市',
                        code: 500100
                    }
                }
                break;
            case '31'://上海
                obj = {
                    province: {
                        name: address.province,
                        code: Number((address.adcode).slice(0, 2)) * 10000
                    },
                    city: {
                        name: '上海市',
                        code: 310100
                    }
                }
                break;
            case '11'://北京
                obj = {
                    province: {
                        name: address.province,
                        code: Number((address.adcode).slice(0, 2)) * 10000
                    },
                    city: {
                        name: '北京市',
                        code: 110100
                    }
                }
                break;
            case '12'://天津
                obj = {
                    province: {
                        name: address.province,
                        code: Number((address.adcode).slice(0, 2)) * 10000
                    },
                    city: {
                        name: '天津市',
                        code: 120100
                    }
                }
                break;
            case '82': //澳门
            case '81'://香港
                obj = {
                    province: {
                        name: address.province,
                        code: Number((address.adcode).slice(0, 2)) * 10000
                    },
                    city: {
                        name: address.district,
                        code: Number(address.adcode)
                    }
                }
                break;
            case '71'://台湾
                obj = {
                    province: {
                        name: address.province,
                        code: Number((address.adcode).slice(0, 2)) * 10000
                    },
                    city: {
                        name: "新北市",
                        code: 71001
                    }
                }
                break;
            default:
                obj = {
                    province: {
                        name: address.province,
                        code: Number((address.adcode).slice(0, 2)) * 10000
                    },
                    city: {
                        name: address.district,
                        code: Number((address.adcode).slice(0, 4)) * 100
                    }
                };
        }
        return obj
    },
    citytransition(code) {
        let pname = String(code).slice(0, 2);
        let obj
        switch (pname) {
            case '50'://重庆
                obj = {
                    city: {
                        name: '重庆市',
                        code: 500100
                    },
                    municipality: true
                }
                break;
            case '31'://上海
                obj = {
                    city: {
                        name: '上海市',
                        code: 310100
                    },
                    municipality: true
                }
                break;
            case '11'://北京
                obj = {
                    city: {
                        name: '北京市',
                        code: 110100
                    },
                    municipality: true
                }
                break;
            case '12'://天津
                obj = {
                    city: {
                        name: '天津市',
                        code: 120100
                    },
                    municipality: true
                }
                break;
            case '82': //澳门
            case '81'://香港
                obj = {
                    city: {
                        name: '',
                        code: Number(code)
                    },
                    municipality: true
                }
                break;
            case '71'://台湾
                obj = {
                    city: {
                        name: "新北市",
                        code: 71001
                    },
                    municipality: true
                }
                break;
            default: {
                obj = {
                    city: {
                        name: '',
                        code: Number(String(code).slice(0, 4)) * 100
                    },
                    municipality: false
                };
            }
        }
        return obj
    },
    dateformat(date, format, num, type = 'day') {
        var calcMonth = (calcmonth, calcYear) => {
            if (calcmonth <= 0) {
                calcmonth += 12
                calcYear -= 1
                return calcMonth(calcmonth, calcYear)
            } else if (calcmonth > 12) {
                calcmonth -= 12
                calcYear += 1
                return calcMonth(calcmonth, calcYear)
            } else {
                return [calcmonth, calcYear]
            }
        }
        const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        var timestamp = date.getTime()
        if (num && type == 'day') {
            timestamp = timestamp + 24 * 60 * 60 * 1000 * num // 当前时间戳（毫秒） - 1天毫秒数 = 前一天时间戳
            date = new Date(timestamp)
        }
        var myYear = date.getFullYear() // 获取完整的年份(4位,1970-????)
        var myMonth = date.getMonth() + 1 // 获取当前月份(0-11,0代表1月)
        var myToday = date.getDate() // 获取当前日(1-31)
        var myWeek = date.getDay() // 获取当前星期X(0-6,0代表星期天)
        var myHour = date.getHours() // 获取当前小时数(0-23)
        var myMinute = date.getMinutes() // 获取当前分钟数(0-59)
        var mySecond = date.getSeconds() // 获取当前秒数(0-59)
        var joinSymbol = '-'
        if (format.includes('/')) {
            joinSymbol = '/'
            format = format.split('/').join('-')
        } else if (format.includes('.')) {
            joinSymbol = '.'
            format = format.split('.').join('-')
        }
        if (num && type == 'month') {
            const calcTimeArray = calcMonth(date.getMonth() + 1 + num, date.getFullYear())
            myMonth = calcTimeArray[0]
            myYear = calcTimeArray[1]
        }
        switch (format) {
            case 'YYYY':
                return String(myYear)
            case 'MM':
                return String(myMonth)
            case 'DD':
                return String(myToday)
            case 'WEEK':
                return String(myWeek)
            case 'YYYY-MM':
                return [myYear, commonfunction.fillZero(myMonth)].join(joinSymbol)
            case 'YYYY-MM-DD':
                return [myYear, commonfunction.fillZero(myMonth), commonfunction.fillZero(myToday)].join(joinSymbol)
            case 'hh':
                return String(myHour)
            case 'mm':
                return String(myMinute)
            case 'ss':
                return String(mySecond)
            case 'hh:mm:ss':
                return [commonfunction.fillZero(myHour), commonfunction.fillZero(myMinute), commonfunction.fillZero(mySecond)].join(':')
            case 'YYYY-MM-DD hh:mm:ss':
                return [myYear, commonfunction.fillZero(myMonth), commonfunction.fillZero(myToday)].join(joinSymbol) + ' ' +
                    [commonfunction.fillZero(myHour), commonfunction.fillZero(myMinute), commonfunction.fillZero(mySecond)].join(':')
            case '年月日 星期':
                return myYear + '年' + commonfunction.fillZero(myMonth) + '月' + commonfunction.fillZero(myToday) + '日' + '&nbsp;' + week[myWeek]
            case '年月日 星期 时间':
                return myYear + '年' + commonfunction.fillZero(myMonth) + '月' + commonfunction.fillZero(myToday) + '日' + '&nbsp;&nbsp;' + week[myWeek] + '&nbsp;&nbsp;' + commonfunction.fillZero(myHour) +
                    ':' + commonfunction.fillZero(myMinute) + ':' + commonfunction.fillZero(mySecond) + '&nbsp;&nbsp;'
            default:
                return String(timestamp)
        }
    },

    /**
       * @description: 数字小于10，加0显示
       * @param {number} date  数字
       * @return {string} 返回字符串格式的数字，默认返回时间戳
       */
    fillZero(num) {
        var realNum
        if (num < 10) {
            realNum = '0' + num
        } else {
            realNum = String(num)
        } return realNum
    },
}
export default commonfunction