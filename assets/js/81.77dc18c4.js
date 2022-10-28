(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{507:function(t,e,a){"use strict";a.r(e);var s=a(65),r=Object(s.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"_30장-date"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_30장-date"}},[t._v("#")]),t._v(" 30장. Date")]),t._v(" "),a("ul",[a("li",[t._v("표준 빌트인 객체인 Date는 날짜와 시간을 위한 메서드를 제공하는 빌트인 객체이면서 생성자 함수")]),t._v(" "),a("li",[t._v("UTC(협정 세계시)는 국제 표준시를 말함"),a("br"),t._v("\nUTC는 GMT(그리니치 평균시)로 불리기도 함"),a("br"),t._v("\nUTC와 GMT는 초의 소수점 단위에서만 차이가 나기 때문에 일상에서는 혼용되어 사용됨"),a("br"),t._v("\n기술적인 표기에서는 UTC가 사용됨")]),t._v(" "),a("li",[t._v("KST(한국 표준시)는 UTC에 9시간을 더한 시간 (즉, KST는 UTC보다 9시간이 빠름)")]),t._v(" "),a("li",[t._v("현재 날짜와 시간은 자바스크립트 코드가 실행된 시스템의 시계에 의해 결정됨")])]),t._v(" "),a("h2",{attrs:{id:"_1-date-생성자-함수"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-date-생성자-함수"}},[t._v("#")]),t._v(" 1. Date 생성자 함수")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("Date는 생성자 함수"),a("br"),t._v("\nDate 생성자 함수로 생성한 Date 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖음"),a("br"),t._v("\n이 값은 1970년 1월 1일 00:00:00(UTC)을 기점으로"),a("br"),t._v("\nDate 객체가 나타내는 날짜와 시간까지의 밀리초를 나타냄.")])]),t._v(" "),a("li",[a("p",[t._v("Date 생성자 함수로 생성한 Date 객체는 기본적으로 현재 날짜와 시간을 나타내는 정수값을 가짐"),a("br"),t._v("\n현재 날짜와 시간이 아닌 다른 날짜와 시간을 다루고 싶은 경우"),a("br"),t._v("\nDate 생성자 함수에 명시적으로 해당 날짜와 시간 정보를 인수로 지정함"),a("br"),t._v("\nDate 생성자 함수로 객체를 생성하는 방법은 다음과 같이 4가지가 있음")])])]),t._v(" "),a("h3",{attrs:{id:"_1-1-new-date"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-new-date"}},[t._v("#")]),t._v(" 1-1. new Date()")]),t._v(" "),a("ul",[a("li",[t._v("Date 생성자 함수를 인수 없이 new 연산자와 함께 호출 시"),a("br"),t._v("\n현재 날짜와 시간을 가지는 Date 객체를 반환함"),a("br"),t._v("\nDate 객체는 내부적으로 날짜와 시간을 나타내는 정수값을 갖지만"),a("br"),t._v("\nDate 객체를 콘솔에 출력하면 기본적으로 날짜와 시간 정보를 출력함"),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Date")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Mon Jul 06 2020 01:03:18 GMT+0900 (대한민국 표준시)")]),t._v("\n")])])])]),t._v(" "),a("li",[t._v("Date 생성자 함수를 new 연산자 없이 호출 시"),a("br"),t._v("\nDate 객체를 반환하지 않고 날짜와 시간 정보를 나타내는 문자열을 반환함"),a("div",{staticClass:"language-s extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('Date(); // "Mon Jul 06 2020 01:10:47 GMT+0900 (대한민국 표준시)"\n```j\n\n')])])])])]),t._v(" "),a("h3",{attrs:{id:"_1-2-new-date-milliseconds"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-new-date-milliseconds"}},[t._v("#")]),t._v(" 1-2. new Date(milliseconds)")]),t._v(" "),a("ul",[a("li",[t._v("Date 생성자 함수에 숫자 타입의 밀리초를 인수로 전달 시"),a("br"),t._v("\n1970년 1월 1일 00:00:00(UTC)을 기점으로 인수로 전달된 밀리초만큼"),a("br"),t._v("\n경과한 날짜와 시간을 나타내는 Date 객체를 반환함")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 한국 표준시 KST는 협정 세계시 UTC에 9시간을 더한 시간이다.")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Date")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Thu Jan 01 1970 09:00:00 GMT+0900 (대한민국 표준시)")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*\n86400000ms는 1day를 의미한다.\n1s = 1,000ms\n1m = 60s * 1,000ms = 60,000ms\n1h = 60m * 60,000ms = 3,600,000ms\n1d = 24h * 3,600,000ms = 86,400,000ms\n*/")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Date")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("86400000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Fri Jan 02 1970 09:00:00 GMT+0900 (대한민국 표준시)")]),t._v("\n")])])]),a("h3",{attrs:{id:"_1-3-new-date-datestring"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-new-date-datestring"}},[t._v("#")]),t._v(" 1-3. new Date(dateString)")]),t._v(" "),a("h3",{attrs:{id:"_1-4-new-date-year-month-day-hour-minute-second-millisecond"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-new-date-year-month-day-hour-minute-second-millisecond"}},[t._v("#")]),t._v(" 1-4. new Date(year, month[, day, hour, minute, second, millisecond])")]),t._v(" "),a("h2",{attrs:{id:"_2-date-메서드"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-date-메서드"}},[t._v("#")]),t._v(" 2. Date 메서드")]),t._v(" "),a("h3",{attrs:{id:"_2-1-date-now"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-date-now"}},[t._v("#")]),t._v(" 2-1. Date.now")]),t._v(" "),a("h3",{attrs:{id:"_2-2-date-parse"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-date-parse"}},[t._v("#")]),t._v(" 2-2. Date.parse")]),t._v(" "),a("h3",{attrs:{id:"_2-3-date-utc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-date-utc"}},[t._v("#")]),t._v(" 2-3. Date.UTC")]),t._v(" "),a("h3",{attrs:{id:"_2-4-date-prototype-getfullyear"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-date-prototype-getfullyear"}},[t._v("#")]),t._v(" 2-4. Date.prototype.getFullYear")]),t._v(" "),a("h3",{attrs:{id:"_2-5-date-prototype-setfullyear"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-date-prototype-setfullyear"}},[t._v("#")]),t._v(" 2-5. Date.prototype.setFullYear")]),t._v(" "),a("h3",{attrs:{id:"_2-6-30-2-6-date-prototype-getmonth"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-30-2-6-date-prototype-getmonth"}},[t._v("#")]),t._v(" 2-6. 30.2.6 Date.prototype.getMonth")]),t._v(" "),a("h3",{attrs:{id:"_2-7-date-prototype-setmonth"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-7-date-prototype-setmonth"}},[t._v("#")]),t._v(" 2-7. Date.prototype.setMonth")]),t._v(" "),a("h3",{attrs:{id:"_2-8-date-prototype-getdate"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-8-date-prototype-getdate"}},[t._v("#")]),t._v(" 2-8. Date.prototype.getDate")]),t._v(" "),a("h3",{attrs:{id:"_2-9-date-prototype-setdate"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-9-date-prototype-setdate"}},[t._v("#")]),t._v(" 2-9. Date.prototype.setDate")]),t._v(" "),a("h3",{attrs:{id:"_2-10-date-prototype-getday"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-10-date-prototype-getday"}},[t._v("#")]),t._v(" 2-10. Date.prototype.getDay")]),t._v(" "),a("h3",{attrs:{id:"_2-11-date-prototype-gethours"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-11-date-prototype-gethours"}},[t._v("#")]),t._v(" 2-11. Date.prototype.getHours")]),t._v(" "),a("h3",{attrs:{id:"_2-12-date-prototype-sethours"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-12-date-prototype-sethours"}},[t._v("#")]),t._v(" 2-12. Date.prototype.setHours")]),t._v(" "),a("h3",{attrs:{id:"_2-13-date-prototype-getminutes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-13-date-prototype-getminutes"}},[t._v("#")]),t._v(" 2-13. Date.prototype.getMinutes")]),t._v(" "),a("h3",{attrs:{id:"_2-14-date-prototype-setminutes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-14-date-prototype-setminutes"}},[t._v("#")]),t._v(" 2-14. Date.prototype.setMinutes")]),t._v(" "),a("h3",{attrs:{id:"_2-15-date-prototype-getseconds"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-15-date-prototype-getseconds"}},[t._v("#")]),t._v(" 2-15. Date.prototype.getSeconds")]),t._v(" "),a("h3",{attrs:{id:"_2-16-date-prototype-setseconds"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-16-date-prototype-setseconds"}},[t._v("#")]),t._v(" 2-16. Date.prototype.setSeconds")]),t._v(" "),a("h3",{attrs:{id:"_2-17-date-prototype-getmilliseconds"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-17-date-prototype-getmilliseconds"}},[t._v("#")]),t._v(" 2-17. Date.prototype.getMilliseconds")]),t._v(" "),a("h3",{attrs:{id:"_2-18-date-prototype-setmilliseconds"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-18-date-prototype-setmilliseconds"}},[t._v("#")]),t._v(" 2-18. Date.prototype.setMilliseconds")]),t._v(" "),a("h3",{attrs:{id:"_2-19-date-prototype-gettime"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-19-date-prototype-gettime"}},[t._v("#")]),t._v(" 2-19. Date.prototype.getTime")]),t._v(" "),a("h3",{attrs:{id:"_2-20-date-prototype-settime"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-20-date-prototype-settime"}},[t._v("#")]),t._v(" 2-20. Date.prototype.setTime")]),t._v(" "),a("h3",{attrs:{id:"_2-21-date-prototype-gettimezoneoffset"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-21-date-prototype-gettimezoneoffset"}},[t._v("#")]),t._v(" 2-21. Date.prototype.getTimezoneOffset")]),t._v(" "),a("h3",{attrs:{id:"_2-22-date-prototype-todatestring"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-22-date-prototype-todatestring"}},[t._v("#")]),t._v(" 2-22. Date.prototype.toDateString")]),t._v(" "),a("h3",{attrs:{id:"_2-23-date-prototype-totimestring"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-23-date-prototype-totimestring"}},[t._v("#")]),t._v(" 2-23. Date.prototype.toTimeString")]),t._v(" "),a("h3",{attrs:{id:"_2-24-date-prototype-toisostring"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-24-date-prototype-toisostring"}},[t._v("#")]),t._v(" 2-24. Date.prototype.toISOString")]),t._v(" "),a("h3",{attrs:{id:"_2-25-date-prototype-tolocalestring"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-25-date-prototype-tolocalestring"}},[t._v("#")]),t._v(" 2-25. Date.prototype.toLocaleString")]),t._v(" "),a("h3",{attrs:{id:"_2-26-date-prototype-tolocaletimestring"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-26-date-prototype-tolocaletimestring"}},[t._v("#")]),t._v(" 2-26. Date.prototype.toLocaleTimeString")]),t._v(" "),a("h2",{attrs:{id:"_3-date를-활용한-시계-예제"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-date를-활용한-시계-예제"}},[t._v("#")]),t._v(" 3. Date를 활용한 시계 예제")])])}),[],!1,null,null,null);e.default=r.exports}}]);