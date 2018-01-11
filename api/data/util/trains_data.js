var http = require('http')
var fs = require('fs')

var trainOptions = {
    host: 'apis.juhe.cn',
    path: 'http://apis.juhe.cn/train/s2swithprice?start=' + encodeURI('延安') + '&end=' + encodeURI('西安') + '&key=9ace1facf995b7f6b3ff945daa235024',
    method: 'GET'
}
console.log(trainOptions['path'])
var CityDetail = function () {
    this.trips = ''
    this.allStart = ''
    this.allEnd = ''
    this.train_type = ''
    this.runTime = ''
    this.arrivalTime = ''
}

city.forEach(function (f) {
    if (f['station'] == '') return;
    let from = f['station'] instanceof Array ? f['station'][0] : f['station']
    let to = ''
    city.forEach(function (to) {
        if (to['station'] == '' || f['name'] == to['name'] || JSON.stringify(f['station']) == JSON.stringify(to['station'])) return;
        to = to['name']
        let data = ''
        let req = http.request(trainOptions, function (res) {
            res.on('data', function (chunk) {
                data += chunk
                console.log(data)
            })
            res.on('end', function () {
                data = JSON.parse(data)
                console.log(data)
                var thisTrain = new CityDetail()
                thisTrain.trips = data['train_no']
                thisTrain.train_type = data['train_type']
                thisTrain.allStart = data['start_station']
                thisTrain.allEnd = data['end_station']
                thisTrain.runTime = data['run_time']
                thisTrain.arrivalTime = data['end_time']
                from.train_number.push(thisTrain)
                fs.appendFile(__dirname + '/../city_train.json', JSON.stringify(from), function (e) {
                    if (e) {
                        console.log(e);
                    }
                })
            })
        })
        req.on('error', function (e) {
            // TODO: handle error.
            console.log('-----error-------', e);
        })
        req.end()
    })
})