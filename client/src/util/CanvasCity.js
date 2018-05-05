/**
 * canvas中各点相对位置
 * 数据格式city
 */
function city(name,X,Y){
	this.name = name;
	this.X=X;
	this.Y=Y;
}

function copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
     res.push(arr[i])
    }
    return res
}

function compare(property){
	return function(obj1,obj2){
     var value1 = obj1[property];
     var value2 = obj2[property];
     return value1 - value2; //升序
  }
}
function Sumr (arr){
 var sum = 0;
 for(let i = 0;i < arr.length; i++){
 	sum += arr[i];
 }
 return sum;
}

function sortXY(D){
	let canvasX = 900;
	let canvasY = 420;

	//计算X等比例值
	let Dt = D.sort(compare("X"));
	let Darr = [];
	for(let i = 0; i < Dt.length-1; i ++){
		Darr.push(D[i + 1].X - D[i].X);
		if(i > 0){
			Darr[i] = Number((Darr[i]/Darr[0])*10);
		}
	}
	Darr[0] = 10;
	let section = canvasX/Sumr(Darr);
	Dt[0].X = 50;
	for(let i = 1;i < Dt.length; i++){
		Dt[i].X = 50 + Darr[i-1]*section;
	}

	//计算Y等比例值
	Dt = Dt.sort(compare("Y"));
	Darr = [];
	for(let i = 0; i < Dt.length-1; i ++){
		Darr.push(D[i + 1].Y - D[i].Y);
		if(i > 0){
			Darr[i] = Number((Darr[i]/Darr[0])*10);
		}
	}
	Darr[0] = 10;
	section = canvasY/Sumr(Darr);
	Dt[0].Y = 30;
	for(let i = 1;i < Dt.length; i++){
		Dt[i].Y = 30 + Darr[i-1]*section;
	}

	return Dt;
}

function CanvasCity(D) {
	let  len = D.length;
	var Dt = copyArr(D);
	if(len>2){
		return sortXY(Dt);
	}else{
		Dt.sort(compare("X"));
		Dt[0].X=250;
		Dt[0].Y=244;
		Dt[1].X=750;
		Dt[1].Y=244;
		return Dt;
	}
}
module.exports = CanvasCity