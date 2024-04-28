// utils
var lodash = _;
var blob2URL = window.URL || window.webkitURL;
var Base64toBlob = function(base64){
    var base64Arr = base64.split(',');
    var imgtype = '';
    var base64String = '';
    if (base64Arr.length > 1) {
        base64String = base64Arr[1];
        imgtype = base64Arr[0].substring(base64Arr[0].indexOf(':')+1, base64Arr[0].indexOf(';'));
    }
    var bytes = window.atob(base64String);
    var bytesCode = new ArrayBuffer(bytes.length);
    var byteArray = new Uint8Array(bytesCode);
    for (var i = 0; i < bytes.length; i++) {
        byteArray[i] = bytes.charCodeAt(i);
    }
    return new Blob([bytesCode], {type: imgtype});
};
// key-value caches
var blobList = {};
var intervalList = {};
// pics player
var __hours, __hoursFull;
var __modelHourPlayTimer;
// gif maker
var gif_blobList = {};
var openWindowStatus = false;
var loadImageStatus = false;
// whether to realtime update
var __ignore_auto_update = false;
// regions selector
var __region = () => $("#region").val();
var georange = {
    'china': '15,55,70,140',
    'eas': '0,30,100,145',
    'wpac': '0,55,100,190',
    'spac': '-50,5,115,195',
    'swpac': '-50,5,115,200',
    'sepac': '-50,5,190,275',
    'epac': '0,40,215,275',
    'cpac': '0,35,175,225',
    'natl': '0,55,255,350',
    'nio': '0,35,40,110',
    'sio': '-40,0,35,115',
    'swio': '-40,0,20,85',
    'seio': '-40,0,75,130',
    'us': '20,55,235,295',
    'japan': '22,48,118,152',
    'aus': '-44,-5,100,155',
    'indopeni': '0,35,75,120',
    'sechina': '17,38,98,128',
    'schina': '17,27,105,118',
    'echina': '24,36,110,125',
    'wchina': '20,50,70,112',
    'nchina': '30,55,100,136',
    'mchina': '25,45,95,122',
    'asia': '-5,75,25,165',
    'easia': '8,65,70,155',
    'europe': '10,75,-50,100',
    'euroasia': '-10,85,0,200',
    'namerica': '-5,85,160,359',
    'northpolar': '-20,90,0,360',
    'southpolar': '-90,20,0,360',
    'customize': __region,
}
var ar = {
    'china': '15,55,70,140',
    'eas': '0,30,100,145',
    'wpac': '0,55,100,190',
    'spac': '-50,5,115,195',
    'swpac': '-50,5,115,200',
    'sepac': '-50,5,190,275',
    'epac': '0,40,215,275',
    'cpac': '0,35,175,225',
    'natl': '0,55,255,350',
    'nio': '0,35,40,110',
    'sio': '-40,0,35,115',
    'swio': '-40,0,20,85',
    'seio': '-40,0,75,130',
    'us': '20,55,235,295',
    'japan': '22,48,118,152',
    'aus': '-44,-5,100,155',
    'indopeni': '0,35,75,120',
    'sechina': '17,38,98,128',
    'schina': '17,27,105,118',
    'echina': '24,36,110,125',
    'wchina': '20,50,70,112',
    'nchina': '30,55,100,136',
    'mchina': '25,45,95,122',
    'asia': '-5,75,25,165',
    'easia': '8,65,70,155',
    'europe': 'europe',
    'euroasia': 'euroasia',
    'namerica': 'northamerica',
    'northpolar': 'northpolar',
    'southpolar': 'southpolar',
    'customize': __region,
};
var img_cmap = {
    'ir0': 'bwd',
    'ir1': 'bd',
    'ir2': 'ott',
    'ir3': 'ca',
};
var fp = {
    'ir0': 'ir',
    'ir1': 'ir',
    'ir2': 'ir',
    'ir3': 'ir',
    't2m': 't2m',
    'tmax2m': 'tmax2m',
    'tmin2m': 'tmin2m',
    'dt2m': 'dt2m',
    'pres': 'pres',
    'wp': 'wind_pres',
    'sgust': 'sgust',
    'w200pres': 'w200pres',
    'sh200-850pres': 'sh200-850pres',
    'z500rvw850': 'z500rvw850',
    'rvw700_pres': 'rvw700_pres',
    'zrv500w200': 'zrv500w200',
    'z500_mslp': 'z500_mslp',
    'z500t850': 'z500t850',
    'z100t850': 'z100t850',
    'zw200': 'zw200',
    'z500a': 'z500a',
    'refc': 'refc',
    'sweat': 'sweat',
    'tt': 'tt',
    'ki': 'ki',
    't2ma': 't2ma',
    't850a': 't850a',
    't850w': 't850w',
    't700w': 't700w',
    'rhw850': 'rhw850',
    'rhw700': 'rhw700',
    'rhw1000': 'rhw1000',
    'qflux850': 'qflux850',
    'qflux700': 'qflux700',
    'qflux1000': 'qflux1000',
    'qfluxwl': 'qfluxwl',
    'apcp': 'apcp',
    'prate': 'prate',
    'cape': 'cape',
    'ow': 'ow',
    'thetae': 'thetae',
    'h0': 'h0',
    'ttropo': 'ttropo',
    'tcdc': 'tcdc',
    'z10t10': 'z10t10',
    'z10t10a': 'z10t10a',
};
var _region = [
    ['china', 'sechina', 'schina', 'echina', 'wchina', 'nchina', 'mchina', 'eas', 'easia', 'asia', 'euroasia', 'indopeni', 'europe', 'namerica', 'us', 'japan', 'aus', 'northpolar', 'southpolar', 'wpac', 'swpac', 'sepac', 'epac', 'natl', 'cpac', 'nio', 'sio', 'seio', 'swio', 'customize'],
    ['China', 'South-eastern China', 'Southern China', 'Eastern China', 'Western China', 'Northern China', 'Mid China', 'East Asian Seas', 'Eastern Asia', 'Asia', 'Europe-asia', 'Indochina Peninsula', 'Europe', 'Northern America', 'United States', 'Japan', 'Australia', 'Northern Hemisphere', 'Southern Hemisphere', 'Western Pacific', 'Southwestern Pacific', 'Southeastern Pacific', 'Eastern Pacific', 'Northern Atlantic Ocean', 'Central Pacific', 'N. Indian Ocean', 'S. Indian Ocean', 'SE. Indian Ocean', 'SW. Indian Ocean', 'Customize']
];

function changeFcstHourValue(value, isfull) {
    if (!isfull) {
        $("#more").html('More');
        $("#more").removeClass('active');
        $("button.hbtn").removeClass("active");
        $("#hourSelected").val(value);
        $("button.hbtn[value=" + value + "]").addClass("active");
        if (__ignore_auto_update && $("#region").val()) {
            $("#update-image").addClass('blinking_button');
            setTimeout(function() {$("#update-image").removeClass('blinking_button')}, 3000);
        }
        if (!__ignore_auto_update) submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
    } else {
        $("button.hbtn").removeClass("active");
        $("#hourSelectedFull").val(value);
        $("#hbtn-" + value).addClass("active");
    }
}

function getModelForecastHours(model, runtime, plotType, isAllHours) {
    let minHour, maxHour, offset, hours = [];
    if (!isAllHours) {
        if (model == 'GFS') {
            offset = plotType.slice(0, 2) == 'ir' || lodash.includes(['apcp', 'prate', 'tcdc'], plotType) ? 6 : 12;
            minHour = plotType.slice(0, 2) == 'ir' ? 1 : lodash.includes(['apcp', 'prate', 'tcdc'], plotType) ? 6 : 0;
            maxHour = plotType.slice(0, 2) == 'ir' ? 120 : 384;
        } else if (model == 'CMC') {
            offset = 6;
            minHour = lodash.includes(['apcp', 'prate'], plotType) ? 6 : 0;
            maxHour = 240;
        } else if (model == 'ICON') {
            let initHour = runtime.slice(runtime.length - 2, runtime.length);
            offset = lodash.includes(['apcp', 'prate', 'tmax2m', 'tmin2m'], plotType) ? 6 : 12;
            minHour = lodash.includes(['apcp', 'prate', 'tmax2m', 'tmin2m'], plotType) ? 6 : 0;
            maxHour = lodash.includes(['06', '18'], initHour) ? 120 : 180;
        } else if (model == 'ECMWF') {
            let initHour = runtime.slice(runtime.length - 2, runtime.length);
            offset = lodash.includes(['apcp'], plotType) ? 3 : lodash.includes(['06', '18'], initHour) ? 6 : 12;
            minHour = lodash.includes(['apcp'], plotType) ? 6 : 0;
            maxHour = lodash.includes(['06', '18'], initHour) ? 90 : 240;
        }
        for (var i = minHour; i <= maxHour; i = i + offset) {
            hours.push(i);
        }
    } else {
        if (model == 'GFS') {
            minHour = plotType.slice(0, 2) == 'ir' || lodash.includes(['apcp', 'prate', 'tcdc'], plotType) ? 1 : 0;
            for (var i = minHour; i <= 120; i++) {
                hours.push(i);
            }
            for (var i = 123; i <= 384; i = i + 3) {
                hours.push(i);
            }
        } else if (model == 'CMC') {
            minHour = lodash.includes(['apcp', 'prate'], plotType) ? 3 : 0;
            maxHour = 240;
            for (var i = minHour; i <= maxHour; i = i + 3) {
                hours.push(i);
            }
        } else if (model == 'ICON') {
            let initHour = runtime.slice(runtime.length - 2, runtime.length);
            minHour = lodash.includes(['apcp', 'prate'], plotType) ? 1 : 0;
            maxHour = lodash.includes(['06', '18'], initHour) ? 120 : 180;
            for (var i = minHour; i <= 78; i++) {
                hours.push(i);
            }
            for (var i = 81; i <= maxHour; i = i + 3) {
                hours.push(i);
            }
        } else if (model == 'ECMWF') {
            let initHour = runtime.slice(runtime.length - 2, runtime.length);
            maxHour = lodash.includes(['06', '18'], initHour) ? 90 : 240;
            for (var i = 0; i <= maxHour; i = i + 3) {
                hours.push(i);
            }
        }
    }
    return hours;
}

function _getModelSettings(model) {
    let img, imgTitle, region, file, img_ir, img_prec, img_temp, img_wp, img_vort, img_anom, img_other, imgName_ir, imgName_prec, imgName_temp, imgName_wp, imgName_vort, imgName_anom, imgName_other;
    if (model == 'GFS') {
        file = 'runtimes.txt';
        img_ir = ['ir0', 'ir1', 'ir2', 'ir3'];
        img_prec = ['prate', 'apcp'];
        img_temp = ['t2m', 'dt2m', 't850w', 't700w', 'z500t850', 'z100t850', 'zw200', 'z10t10', 'ttropo', 'h0'];
        img_wp = ['pres', 'wp', 'sgust', 'z500_mslp', 'w200pres', 'sh200-850pres'];
        img_rhw = ['rhw850', 'rhw700', 'rhw1000'];
        img_qflux = ['qflux850', 'qflux700', 'qflux1000', 'qfluxwl'];
        img_vort = ['z500rvw850', 'rvw700_pres', 'zrv500w200'];
        img_anom = ['t2ma', 't850a', 'z500a', 'z10t10a'];
        img_other = ['refc', 'sweat', 'tt', 'ki', 'thetae', 'cape', 'ow', 'tcdc'];
        imgName_ir = ['Simulated IR-BW', 'Simulated IR-BD', 'Simulated IR-OTT', 'Simulated IR-CA'];
        imgName_prec = ['Precipitation Rate', 'Total Precipitation'];
        imgName_temp = ['2m Air Temp.', '2m DP Temp.', '850mb Temp. & Wind', '700mb Temp. & Wind', '500mb HGT & 850mb Temp.', '100mb HGT & 850mb Temp.', '200mb HGT & Wind', '10mb HGT & Temp.', 'Tropopause Temperature', 'Highest Tropospheric Freezing Level'];
        imgName_wp = ['Mean Sea Level Pressure', '10m Wind & MSLP', 'Surface Wind Gust', '500mb HGT & MSLP', '200mb Wind & MSLP', '200-850mb Wind Shear & MSLP'];
        imgName_rhw = ['850mb RH. & Wind', '700mb RH. & Wind', '1000mb RH. & Wind'];
        imgName_qflux = ['850mb Vapor Flux', '700mb Vapor Flux', '1000mb Vapor Flux', 'Integrated Vapor Transport'];
        imgName_vort = ['500mb HGT & 850mb Vort. & Wind', '700mb Vort. & Wind & MSLP', '500mb HGT & Vort. & 200mb Wind'];
        imgName_anom = ['2m Air Temp. Anomaly', '850mb Temp. Anomaly', '500mb HGT Anomaly', '10mb HGT & Temp. Anomaly'];
        imgName_other = ['Composite Reflectivity', 'SWEAT Index', 'Total Totals Index', 'K-Index', '850mb Theta-E', 'Convective Available Potential Energy', '850mb Okubo-Weiss', 'Total Cloud Cover'];
        img = [
            [img_temp, imgName_temp],
            [img_wp, imgName_wp],
            [img_ir, imgName_ir],
            [img_prec, imgName_prec],
            [img_rhw, imgName_rhw],
            [img_qflux, imgName_qflux],
            [img_vort, imgName_vort],
            [img_anom, imgName_anom],
            [img_other, imgName_other]
        ];
        imgTitle = ['Temperature', 'Wind / MSLP', 'Simulated IR', 'Precipitation', 'RH. & Wind', 'Vapor Flux', 'Vorticity', 'Anomalies', 'Others'];
        region = {
            'ir0': _region,
            'ir1': _region,
            'ir2': _region,
            't2m': _region,
            'dt2m': _region,
            't850w': _region,
            't700w': _region,
            't2ma': _region,
            't850a': _region,
            'pres': _region,
            'wp': _region,
            'sgust': _region,
            'w200pres': _region,
            'sh200-850pres': _region,
            'z500rvw850': _region,
            'rvw700_pres': _region,
            'zrv500w200': _region,
            'z500_mslp': _region,
            'z500t850': _region,
            'z100t850': _region,
            'zw200': _region,
            'z500a': _region,
            'refc': _region,
            'sweat': _region,
            'tt': _region,
            'ki': _region,
            'thetae': _region,
            'rhw850': _region,
            'rhw700': _region,
            'rhw1000': _region,
            'qflux850': _region,
            'qflux700': _region,
            'qflux1000': _region,
            'qfluxwl': _region,
            'apcp': _region,
            'snodWE': _region,
            'prate': _region,
            'cape': _region,
            'ow': _region,
            'tcdc': _region,
            'snow24h': _region,
            'h0': _region,
            'ttropo': _region,
            'z10t10': [
                ['northpolar', 'southpolar'],
                ['Northern Hemisphere', 'Southern Hemisphere']
            ],
            'z10t10a': [
                ['northpolar', 'southpolar'],
                ['Northern Hemisphere', 'Southern Hemisphere']
            ],
        };
    } else if (model == 'CMC') {
        file = '/cmc/latest/runs';
        img_ir = ['ir0', 'ir1', 'ir2'];
        img_prec = ['prate', 'apcp'];
        img_temp = ['t2m', 'dt2m', 't850w', 't700w', 'z500t850', 'z100t850', 'zw200', 'z10t10'];
        img_wp = ['pres', 'wp', 'z500_mslp', 'w200pres', 'sh200-850pres'];
        img_rhw = ['rhw850', 'rhw700', 'rhw1000'];
        img_anom = ['t2ma', 't850a', 'z500a', 'z10t10a'];
        img_other = ['sweat', 'tt', 'ki', 'thetae', 'cape'];
        imgName_ir = ['Simulated IR-BW', 'Simulated IR-BD', 'Simulated IR-OTT'];
        imgName_prec = ['Precipitation Rate', 'Total Precipitation'];
        imgName_temp = ['2m Air Temp.', '2m DP Temp.', '850mb Temp. & Wind', '700mb Temp. & Wind', '500mb HGT & 850mb Temp.', '100mb HGT & 850mb Temp.', '200mb HGT & Wind', '10mb HGT & Temp.'];
        imgName_wp = ['Mean Sea Level Pressure', '10m Wind & MSLP', '500mb HGT & MSLP', '200mb Wind & MSLP', '200-850mb Wind Shear & MSLP'];
        imgName_rhw = ['850mb RH. & Wind', '700mb RH. & Wind', '1000mb RH. & Wind'];
        imgName_anom = ['2m Air Temp. Anomaly', '850mb Temp. Anomaly', '500mb HGT Anomaly', '10mb HGT & Temp. Anomaly'];
        imgName_other = ['SWEAT Index', 'Total Totals Index', 'K-Index', '850mb Theta-E', 'Convective Available Potential Energy'];
        img = [
            [img_temp, imgName_temp],
            [img_wp, imgName_wp],
            [img_ir, imgName_ir],
            [img_prec, imgName_prec],
            [img_rhw, imgName_rhw],
            [img_anom, imgName_anom],
            [img_other, imgName_other]
        ];
        imgTitle = ['Temperature', 'Wind / MSLP', 'Simulated IR', 'Precipitation', 'RH. & Wind', 'Anomalies', 'Others'];
        region = {
            'ir0': _region,
            'ir1': _region,
            'ir2': _region,
            't2m': _region,
            'dt2m': _region,
            't850w': _region,
            't700w': _region,
            't2ma': _region,
            't850a': _region,
            'pres': _region,
            'wp': _region,
            'w200pres': _region,
            'sh200-850pres': _region,
            'z500_mslp': _region,
            'z500t850': _region,
            'z100t850': _region,
            'zw200': _region,
            'z500a': _region,
            'sweat': _region,
            'tt': _region,
            'ki': _region,
            'thetae': _region,
            'rhw850': _region,
            'rhw700': _region,
            'rhw1000': _region,
            'apcp': _region,
            'prate': _region,
            'cape': _region,
            'z10t10': [
                ['northpolar', 'southpolar'],
                ['Northern Hemisphere', 'Southern Hemisphere']
            ],
            'z10t10a': [
                ['northpolar', 'southpolar'],
                ['Northern Hemisphere', 'Southern Hemisphere']
            ],
        };
    } else if (model == 'ICON') {
        file = '/icon/latest/runs';
        // img_prec = ['prate', 'apcp'];
        img_prec = ['apcp'];
        img_temp = ['t2m', 'tmax2m', 'tmin2m', 'dt2m', 't850w', 't700w', 'z500t850', 'z100t850', 'zw200'];
        img_wp = ['pres', 'wp', 'z500_mslp', 'w200pres', 'sh200-850pres'];
        img_rhw = ['rhw850', 'rhw700', 'rhw1000'];
        img_anom = ['t2ma', 't850a', 'z500a'];
        img_other = ['sweat', 'tt', 'ki', 'thetae', 'cape'];
        // imgName_prec = ['Precipitation Rate', 'Total Precipitation'];
        imgName_prec = ['Total Precipitation'];
        imgName_temp = ['2m Air Temp.', '2m Max. Temp.', '2m Min. Temp.', '2m DP Temp.', '850mb Temp. & Wind', '700mb Temp. & Wind', '500mb HGT & 850mb Temp.', '100mb HGT & 850mb Temp.', '200mb HGT & Wind'];
        imgName_wp = ['Mean Sea Level Pressure', '10m Wind & MSLP', '500mb HGT & MSLP', '200mb Wind & MSLP', '200-850mb Wind Shear & MSLP'];
        imgName_rhw = ['850mb RH. & Wind', '700mb RH. & Wind', '1000mb RH. & Wind'];
        imgName_anom = ['2m Air Temp. Anomaly', '850mb Temp. Anomaly', '500mb HGT Anomaly'];
        imgName_other = ['SWEAT Index', 'Total Totals Index', 'K-Index', '850mb Theta-E', 'Convective Available Potential Energy'];
        img = [
            [img_temp, imgName_temp],
            [img_wp, imgName_wp],
            [img_prec, imgName_prec],
            [img_rhw, imgName_rhw],
            [img_anom, imgName_anom],
            [img_other, imgName_other]
        ];
        imgTitle = ['Temperature', 'Wind / MSLP', 'Precipitation', 'RH. & Wind', 'Anomalies', 'Others'];
        region = {
            't2m': _region,
            'tmax2m': _region,
            'tmin2m': _region,
            'dt2m': _region,
            't850w': _region,
            't700w': _region,
            't2ma': _region,
            't850a': _region,
            'pres': _region,
            'wp': _region,
            'w200pres': _region,
            'sh200-850pres': _region,
            'z500_mslp': _region,
            'z500t850': _region,
            'z100t850': _region,
            'zw200': _region,
            'z500a': _region,
            'sweat': _region,
            'tt': _region,
            'ki': _region,
            'thetae': _region,
            'rhw850': _region,
            'rhw700': _region,
            'rhw1000': _region,
            'apcp': _region,
            'prate': _region,
            'cape': _region
        };
    } else if (model == 'ECMWF') {
        file = 'runtimes_ec.txt';
        img_prec = ['apcp'];
        img_temp = ['t2m', 't850w', 't700w', 'z500t850', 'zw200'];
        img_wp = ['pres', 'wp', 'z500_mslp', 'w200pres', 'sh200-850pres'];
        img_rhw = ['rhw850', 'rhw700', 'rhw1000'];
        img_qflux = ['qflux850', 'qflux700', 'qflux1000', 'qfluxwl'];
        img_vort = ['z500rvw850', 'rvw700_pres', 'zrv500w200'];
        img_anom = ['t2ma', 't850a', 'z500a'];
        img_other = ['sweat', 'tt', 'ki', 'thetae', 'ow'];
        imgName_prec = ['Total Precipitation'];
        imgName_temp = ['2m Air Temp.', '850mb Temp. & Wind', '700mb Temp. & Wind', '500mb HGT & 850mb Temp.', '200mb HGT & Wind'];
        imgName_wp = ['Mean Sea Level Pressure', '10m Wind & MSLP', '500mb HGT & MSLP', '200mb Wind & MSLP', '200-850mb Wind Shear & MSLP'];
        imgName_rhw = ['850mb RH. & Wind', '700mb RH. & Wind', '1000mb RH. & Wind'];
        imgName_qflux = ['850mb Vapor Flux', '700mb Vapor Flux', '1000mb Vapor Flux', 'Integrated Vapor Transport'];
        imgName_vort = ['500mb HGT & 850mb Vort. & Wind', '700mb Vort. & Wind & MSLP', '500mb HGT & Vort. & 200mb Wind'];
        imgName_anom = ['2m Air Temp. Anomaly', '850mb Temp. Anomaly', '500mb HGT Anomaly'];
        imgName_other = ['SWEAT Index', 'Total Totals Index', 'K-Index', '850mb Theta-E', '850mb Okubo-Weiss'];
        img = [
            [img_temp, imgName_temp],
            [img_wp, imgName_wp],
            [img_prec, imgName_prec],
            [img_rhw, imgName_rhw],
            [img_qflux, imgName_qflux],
            [img_vort, imgName_vort],
            [img_anom, imgName_anom],
            [img_other, imgName_other]
        ];
        imgTitle = ['Temperature', 'Wind / MSLP', 'Precipitation', 'RH. & Wind', 'Vapor Flux', 'Vorticity', 'Anomalies', 'Others'];
        region = {
            't2m': _region,
            't850w': _region,
            't700w': _region,
            't2ma': _region,
            't850a': _region,
            'pres': _region,
            'wp': _region,
            'w200pres': _region,
            'sh200-850pres': _region,
            'z500rvw850': _region,
            'rvw700_pres': _region,
            'zrv500w200': _region,
            'z500_mslp': _region,
            'z500t850': _region,
            'zw200': _region,
            'z500a': _region,
            'sweat': _region,
            'tt': _region,
            'ki': _region,
            'thetae': _region,
            'rhw850': _region,
            'rhw700': _region,
            'rhw1000': _region,
            'qflux850': _region,
            'qflux700': _region,
            'qflux1000': _region,
            'qfluxwl': _region,
            'apcp': _region,
            'ow': _region,
        };
    }
    return {
        'img': img,
        'imgTitle': imgTitle,
        'region': region,
        'file': file
    };
}

function setModelsListener() {
    $("#runtime").on('change', () => {
        ClearLoadImagesStatus();
        var {
            'img': img,
            'imgTitle': imgTitle,
            'region': region,
            'file': file
        } = _getModelSettings($("#model").val());
        $("#customize").css('display', 'none');
        $("#update-image").css('display', 'none');
        // $("#area").val(region[$("#imgType").val()][0][0]);
        if (lodash.includes(['ECMWF', 'ICON'], $("#model").val())) {
            let html = '';
            let hours = getModelForecastHours($("#model").val(), $("#runtime").val(), fp[$("#imgType").val()], false);
            __hours = hours;
            __hoursFull = getModelForecastHours($("#model").val(), $("#runtime").val(), fp[$("#imgType").val()], true);
            for (let i = 0; i < hours.length; i++) {
                html += '<button type="button" class="hbtn" onclick="changeFcstHourValue(\'' + hours[i].toString() + '\', false);" value=' + hours[i].toString() + '>' + hours[i].toString() + '</button>';
            }
            $("#hours").html(html);
            changeFcstHourValue(hours[0], false);
        }
        if (__ignore_auto_update && $("#region").val()) {
            $("#update-image").addClass('blinking_button');
            setTimeout(function() {$("#update-image").removeClass('blinking_button')}, 3000);
        }
        if (!__ignore_auto_update) submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
    });
    $("#model").on('change', () => {
        ClearLoadImagesStatus();
        var {
            'img': img,
            'imgTitle': imgTitle,
            'region': region,
            'file': file
        } = _getModelSettings($("#model").val());
        $("#customize").css('display', 'none');
        $("#update-image").css('display', 'none');
        // $("#area").val(region[$("#imgType").val()][0][0]);
        var url = file.indexOf('runtimes') != -1 ? ('//' + window.location.host.replace('www', 'data') + '/') : ('//' + window.location.host.replace('www', 'api'));
        $.ajax({
            type: 'GET',
            url: url + file,
            success: function(data) {
                let latest = data.split('\n');
                let html = '';
                for (let i = 0; i < latest.length; i++) {
                    html += "<option value=\"" + latest[i] + "\">" + latest[i] + "</option>";
                }
                $("#runtime").html(html);
                html = '';
                let hours = getModelForecastHours($("#model").val(), latest[0], fp[img[0][0][0]], false);
                __hours = hours;
                __hoursFull = getModelForecastHours($("#model").val(), latest[0], fp[img[0][0][0]], true);
                for (let i = 0; i < hours.length; i++) {
                    html += '<button type="button" class="hbtn" onclick="changeFcstHourValue(\'' + hours[i].toString() + '\', false);" value=' + hours[i].toString() + '>' + hours[i].toString() + '</button>';
                }
                $("#hours").html(html);
                html = '';
                for (let i = 0; i < img.length; i++) {
                    html += "<optgroup label=\"" + imgTitle[i] + "\">";
                    for (var j = 0; j < img[i][0].length; j++) {
                        html += "<option value=\"" + img[i][0][j] + "\">" + img[i][1][j] + "</option>";
                    }
                    html += "</optgroup>";
                }
                $("#imgType").html(html);
                $("#imgType").val(img[0][0][0]);
                html = '';
                changeFcstHourValue(hours[0], false);
                if (__ignore_auto_update && $("#region").val()) {
                    $("#update-image").addClass('blinking_button');
                    setTimeout(function() {$("#update-image").removeClass('blinking_button')}, 3000);
                }
                if (!__ignore_auto_update) submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
            },
            dataType: "text",
            error: function() {
                $("#image").html("<div class=\"ace-container\">Data not found.</div>");
            }
        });
    });
    $("#imgType").change(function(){
        ClearLoadImagesStatus();
        if (__ignore_auto_update && $("#region").val()) {
            $("#update-image").addClass('blinking_button');
            setTimeout(function() {$("#update-image").removeClass('blinking_button')}, 3000);
        }
        if (!__ignore_auto_update) submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val(), false);
    });
    $("#imgType").change(function(){
        ClearLoadImagesStatus();
        var html = '';
        var {'img': img, 'imgTitle': imgTitle, 'region': region, 'file': file} = _getModelSettings($("#model").val());
        var hours = getModelForecastHours($("#model").val(), $("#runtime").val(), fp[$("#imgType").val()], false);
        __hours = hours;
        __hoursFull = getModelForecastHours($("#model").val(), $("#runtime").val(), fp[$("#imgType").val()], true);
        for (var i = 0; i < hours.length; i++) {
            html += '<button type="button" class="hbtn" onclick="changeFcstHourValue(\'' + hours[i].toString() + '\', false);" value=' + hours[i].toString() + '>' + hours[i].toString() + '</button>';
        }
        $("#hours").html(html);
        changeFcstHourValue(hours[0], false);
        html = '';
        var val = $("#area").val();
        for (var i = 0; i < region[$("#imgType").val()][0].length; i++) {
            html += "<option value=\"" + region[$("#imgType").val()][0][i] + "\">" + region[$("#imgType").val()][1][i] + "</option>";
        }
        onMatch = html.includes(val);
        if (html != $("#area").html()) {
            $("#area").html(html);
            if (!onMatch) {
                $("#area").attr("value", 'china');
                val = $("#area").val();
                $("#area").find("option[value='" + val + "']").attr("selected", true);
            } else {
                $("#area").attr("value", val);
                $("#area").find("option[value='" + val + "']").attr("selected", true);
            }
            if ($("#area").val() != 'customize') {
                $("#customize").css('display', 'none');
                $("#customize").html('');
            }
        }
        if (__ignore_auto_update && $("#region").val()) {
            $("#update-image").addClass('blinking_button');
            setTimeout(function() {$("#update-image").removeClass('blinking_button')}, 3000);
        }
        if (!__ignore_auto_update) submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
    });
    $("#area").change(function(){
        ClearLoadImagesStatus();
        if ($("#area").val() == 'customize') {
            $("#customize").css('display', 'block');
            $("#update-image").css('display', 'block');
            __ignore_auto_update = true;
        } else {
            $("#customize").css('display', 'none');
            $("#update-image").css('display', 'none');
            __ignore_auto_update = false;
            submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
        }
    });
    $("#region").change(function(){
        ClearLoadImagesStatus();
        if (__ignore_auto_update && $("#region").val()) {
            $("#update-image").addClass('blinking_button');
            setTimeout(function() {$("#update-image").removeClass('blinking_button')}, 3000);
        }
    });
    $("#region").on('input', () => {
        $("#update-image").removeClass('blinking_button');
    });
    $("#update-image").on('click', () => {
        ClearLoadImagesStatus();
        $("#update-image").removeClass('blinking_button');
        submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), 'customize', $("#imgType").val(), false);
    });
    $("#modelHourBack").on('click', () => {
        let index = __hours.findIndex((value) => value == $("#hourSelected").val());
        if (index == 0) return false;
        if (index == -1) index = 1;
        changeFcstHourValue(__hours[index - 1], false);
    });
    $("#modelHourForward").on('click', () => {
        let index = __hours.findIndex((value) => value == $("#hourSelected").val());
        if (index == __hours.length - 1) index = -1;
        changeFcstHourValue(__hours[index + 1], false);
    });
    $("#modelHourPlay").on('click', () => {
        $("#modelHourPlayIcon").toggleClass("glyphicon-play");
        $("#modelHourPlayIcon").toggleClass("glyphicon-pause");
        let status = $("#modelHourPlayStatus").text();
        if (status == 'stop') {
            __modelHourPlayTimer = setInterval(() => {
                let index = __hours.findIndex((value) => value == $("#hourSelected").val());
                if (index == __hours.length - 1) index = -1;
                changeFcstHourValue(__hours[index + 1], false);
            }, 500);
            $("#modelHourPlayStatus").text('start');
        } else {
            clearInterval(__modelHourPlayTimer);
            $("#modelHourPlayStatus").text('stop');
        }
    });
}

function getImageryCacheURL(model, runtime, fcsthour, imgType, area) {
    let format;
    let geo = area == 'customize' ? georange[area]().split(',') : georange[area].split(',');
    let geoFormat = lodash.includes(['chinamerc', 'northpolar', 'southpolar', 'euroasia', 'europe', 'northamerica'], area) ? georange[area].split(',').join("_") : $.sprintf('%.1f_%.1f_%.1f_%.1f', geo[0], geo[1], geo[2], geo[3]);
    switch (model) {
        case 'GFS':
            format = $.sprintf('//data.dapiya.top/satellite/%s/data/%s_%s_f%03d_%s_%s.png', model.toLowerCase(), model.toLowerCase(), fp[imgType], fcsthour, runtime, geoFormat);
            break;
        case 'ICON':
            format = $.sprintf('//data.dapiya.top/satellite/%s/data/%s_%s_f%03d_%s_%s.png', model.toLowerCase(), model.toLowerCase(), fp[imgType], fcsthour, runtime, geoFormat);
            break;
        case 'CMC':
            format = $.sprintf('//data.dapiya.top/satellite/%s/data/gem_%s_f%03d_%s_%s.png', model.toLowerCase(), fp[imgType], fcsthour, runtime, geoFormat);
            break;
        case 'ECMWF':
            let initHour = runtime.slice(runtime.length - 2, runtime.length);
            let mode = lodash.includes(['06', '18'], initHour) ? 'scda' : 'oper';
            format = $.sprintf('//data.dapiya.top/satellite/%s/data/%s0000_%dh_%s_fc_%s_%s.png', model.toLowerCase(), runtime, fcsthour, mode, fp[imgType], geoFormat);
            break;
        default:
            format = '';
    }
    return format;
}

function checkFCSTValue(value, ID) {
    if ($('#hourSelected').val() == value) {
        $('#' + ID).attr('disabled', 'disabled');
    } else {
        $('#' + ID).removeAttr('disabled');
    }
    changeFcstHourValue(value, true);
}

function setFullForecastTimeInModalBox(boxID) {
    let hours = getModelForecastHours($("#model").val(), $("#runtime").val(), fp[$("#imgType").val()], true);
    let notIncludeHours = getModelForecastHours($("#model").val(), $("#runtime").val(), fp[$("#imgType").val()], false);
    let html = '<div id="hours" style="height: 52vh; max-height: 52vh; overflow-y: auto;">';
    $("#" + boxID + "Title").html("Select Forecast Time");
    for (let i of hours) {
        if ($('#hourSelected').val() == i.toString()) {
            html += '<button type="button" class="hbtn active" onclick="checkFCSTValue(' + i.toString() + ', \'checkButton\')" id="hbtn-' + i.toString() + '">' + i.toString() + '</button>';
        } else {
            html += '<button type="button" class="hbtn" onclick="checkFCSTValue(' + i.toString() + ', \'checkButton\')" id="hbtn-' + i.toString() + '">' + i.toString() + '</button>';
        }
    }
    html += '</div>';
    html += '<input type="text" class="rput" style="display: none;" id="hourSelectedFull">';
    $("#" + boxID + "Content").html(html);
    html = '<button type="button" class="btn btn-primary" id="checkButton">Choose</button>\
            <button type="button" class="btn btn-primary" id="uncheckButton">Close</button>';
    $("#" + boxID + "Footer").html(html);
    $("#checkButton").attr('disabled', 'disabled');
    $("#checkButton").click(function() {
        $("#" + boxID).modal('hide');
        $("#hourSelected").val($("#hourSelectedFull").val());
        if (__ignore_auto_update && $("#region").val()) {
            $("#update-image").addClass('blinking_button');
            setTimeout(function() {$("#update-image").removeClass('blinking_button')}, 3000);
        }
        if (!__ignore_auto_update) submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
        if (!lodash.includes(notIncludeHours, parseInt($("#hourSelected").val()))) {
            $("#more").html($.sprintf("+%03dH", $("#hourSelected").val()));
            $("#more").addClass('active');
            $("#hours").scrollTop(0);
        } else {
            $("#more").html('More');
            $("#more").removeClass('active');
            $("button.hbtn[value=" + $("#hourSelected").val() + "]").addClass("active");
            let __p = $("button.hbtn[value=" + $("#hourSelected").val() + "]").position().top;
            $("#hours").scrollTop(__p - 59);
        }
    });
    $("#uncheckButton").click(function() {
        $("#" + boxID).modal('hide');
        $("button.hbtn[value=" + $("#hourSelected").val() + "]").addClass("active");
    });
    $("#" + boxID).modal('show');
}

function showGIFGeneratorWindow() {
    var GIFWindowContent = `
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" id="CloseGIFWindow" onclick="openWindowStatus = false;">&times;</button>
        <h4 class="modal-title" id="GIFWindowLabel">GIF Generator Options</h4>
    </div>
    <div class="modal-body">
        <form>
            <div class="form-group">
                <label for="StartHour" class="control-label">Start Hour</label>
                <input type="text" class="form-control" id="StartHour" placeholder="Start Hour" value="0">
            </div>
            <div class="form-group">
                <label for="EndHour" class="control-label">End Hour</label>
                <input type="text" class="form-control" id="EndHour" placeholder="End Hour" value="384">
            </div>
            <div class="form-group">
                <label for="IntervalHour" class="control-label">Interval Hour</label>
                <input type="text" class="form-control" id="IntervalHour" placeholder="Interval Hour" value="24">
            </div>
            <div class="form-group">
                <label for="IntervalSecond" class="control-label">Interval Each Step (Second)</label>
                <input type="text" class="form-control" id="IntervalSecond" placeholder="Interval Each Step (Second)" value="0.1">
            </div>
            <div class="form-group">
                <label for="NumberofWorkers" class="control-label">Number of Workers</label>
                <input type="text" class="form-control" id="NumberofWorkers" placeholder="Number of Workers" value="2">
            </div>
        </form>
        <div>
            <label for="GIFprogress">Progress of <span id="LoadingType">Image Loading</span>:</label>
            <div class="progress" role="progressbar" aria-label="Animated progressbar">
                <div class="progress-bar progress-bar-striped active" style="min-width: 2em;" id="GIFprogress">0%</div>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-primary" onclick="LoadImages(model.value, runtime.value, area.value, imgType.value, parseInt(StartHour.value), parseInt(EndHour.value), parseInt(IntervalHour.value), parseFloat(IntervalSecond.value), parseInt(NumberofWorkers.value));" id="CreateGIFButton">Create GIF</button>
    </div>
    `;
    if (!intervalList.hasOwnProperty('ImageLoader')) {
        $('#GIFGeneratorContent').html(GIFWindowContent);
    }
    $('#GIFWindow').modal('show');
    openWindowStatus = true;
}

function ClearLoadImagesStatus() {
    openWindowStatus = false;
    if (loadImageStatus) {
        loadImageStatus = false;
        Object.keys(intervalList).forEach(function(IntervalName) {
            clearInterval(intervalList[IntervalName]); // 清除计时器
            delete(intervalList[IntervalName]); // 删除键值对
        });
    }
}

function LoadImages(model, runtime, area, imgType, StartHour, EndHour, IntervalHour, IntervalSecond, NumberofWorkers) {
    $("#StartHour").attr('disabled', 'disabled');
    $("#EndHour").attr('disabled', 'disabled');
    $("#IntervalHour").attr('disabled', 'disabled');
    $("#IntervalSecond").attr('disabled', 'disabled');
    $("#NumberofWorkers").attr('disabled', 'disabled');
    $("#CreateGIFButton").attr('disabled', 'disabled');
    // check configs
    if (typeof(StartHour) != 'number' ||
        typeof(EndHour) != 'number' ||
        typeof(IntervalHour) != 'number' ||
        typeof(IntervalSecond) != 'number' ||
        typeof(NumberofWorkers) != 'number') {
        alert("Type of parameters must be a number.");
        $("#StartHour").removeAttr('disabled');
        $("#EndHour").removeAttr('disabled');
        $("#IntervalHour").removeAttr('disabled');
        $("#IntervalSecond").removeAttr('disabled');
        $("#NumberofWorkers").removeAttr('disabled');
        $("#CreateGIFButton").removeAttr('disabled');
        return false;
    }
    if (isNaN(StartHour) || isNaN(EndHour) || isNaN(IntervalHour) ||
        isNaN(IntervalSecond) || isNaN(NumberofWorkers)) {
        alert("Type of parameters must be a number.");
        $("#StartHour").removeAttr('disabled');
        $("#EndHour").removeAttr('disabled');
        $("#IntervalHour").removeAttr('disabled');
        $("#IntervalSecond").removeAttr('disabled');
        $("#NumberofWorkers").removeAttr('disabled');
        $("#CreateGIFButton").removeAttr('disabled');
        return false;
    }
    // check hours
    var gif_hours = [], check_status = true;
    for (var i = StartHour; i <= EndHour; i = i + IntervalHour) {
        if (!lodash.includes(__hoursFull, i)) {
            check_status = false;
            break;
        }
        gif_hours.push(i);
    }
    if (!check_status || gif_hours.length == 0) {
        alert("One of forecast hour is not found at available hours.");
        $("#StartHour").removeAttr('disabled');
        $("#EndHour").removeAttr('disabled');
        $("#IntervalHour").removeAttr('disabled');
        $("#IntervalSecond").removeAttr('disabled');
        $("#NumberofWorkers").removeAttr('disabled');
        $("#CreateGIFButton").removeAttr('disabled');
        return false;
    }
    // load images
    gif_blobList = {};
    loadImageStatus = true;
    var startTime = new Date();
    var imageObjList = [], imageObjIndexList = [];
    for (var i = 0; i < gif_hours.length; i++) {
        submit_data(model, runtime, gif_hours[i], area, imgType, true);
    }
    var __interval = setInterval(function() {
        var successCount = 0, isFailed = false;
        for (var j = 0; j < gif_hours.length; j++) {
            var cacheURL = getImageryCacheURL(model, runtime, gif_hours[j], imgType, area);
            if (gif_blobList.hasOwnProperty(cacheURL)) {
                isFailed = (gif_blobList[cacheURL] == '');
                if (isFailed) break;
                if (gif_blobList[cacheURL] == 'USED') {
                    // 成功计数+1
                    successCount++;
                    continue;
                }
                // 创建Image对象，为GIF提供数据
                if (imageObjIndexList.indexOf(j) == -1) {
                    var imageObj = new Image();
                    imageObj.crossOrigin = "Anonymous";
                    imageObj.style = "position: fixed; opacity: 0;";
                    imageObj.src = gif_blobList[cacheURL];
                    imageObjList.push(imageObj);
                    imageObjIndexList.push(j);
                    // 标记已使用的键值对
                    gif_blobList[cacheURL] = 'USED';
                    // 成功计数+1
                    successCount++;
                }
            }
        }
        if (isFailed && openWindowStatus) {
            clearInterval(intervalList['ImageLoader']); // 清除计时器
            delete(intervalList['ImageLoader']); // 删除键值对
            loadImageStatus = false;
            alert("Download images failed.");
            // 恢复窗口状态
            $("#StartHour").removeAttr('disabled');
            $("#EndHour").removeAttr('disabled');
            $("#IntervalHour").removeAttr('disabled');
            $("#IntervalSecond").removeAttr('disabled');
            $("#NumberofWorkers").removeAttr('disabled');
            $("#CreateGIFButton").removeAttr('disabled');
            // 重置进度条
            $('#GIFprogress').css('width', '0%');
            $('#GIFprogress').html('0%');
            return false;
        }
        var progress = lodash.floor((successCount / gif_hours.length) * 100);
        $('#GIFprogress').css('width', progress.toString() + '%');
        $('#GIFprogress').html(progress.toString() + '%');
        if (successCount == gif_hours.length && openWindowStatus) {
            // 对数组排序
            imageObjList = lodash.sortBy(imageObjList, function(o) { return imageObjIndexList[imageObjList.indexOf(o)] });
            clearInterval(intervalList['ImageLoader']); // 清除计时器
            delete(intervalList['ImageLoader']); // 删除键值对
            // 清空key-value cache
            gif_blobList = {};
            // 提前阻止窗口关闭
            $("#CloseGIFWindow").css('display', 'none');
            setTimeout(function() {
                // 重置进度条
                $('#GIFprogress').css('width', '0%');
                $('#GIFprogress').html('0%');
                // 开始制作GIF
                $('#LoadingType').html('GIF Generating');
                GIFGenerator(imageObjList, startTime, IntervalSecond, NumberofWorkers);
            }, 1000);
        }
    }, 3000);
    intervalList['ImageLoader'] = __interval;
}

function GIFGenerator(imageObjList, startTime, IntervalSecond, NumberofWorkers) {
    loadImageStatus = false;
    // repeat latest images for stopping GIF
    var last_imageObj = imageObjList[imageObjList.length - 1];
    for (var i = 0; i < parseInt(1 / IntervalSecond); i++) {
        imageObjList.push(last_imageObj);
    }
    var imageWidth = parseInt(imageObjList[0].width * 0.75);
    var imageHeight = parseInt(imageObjList[0].height * 0.75);
    gifshot.createGIF({
        'gifWidth': imageWidth,
        'gifHeight': imageHeight,
        'images': imageObjList,
        'interval': IntervalSecond,
        'frameDuration': 1,
        'sampleInterval': 10,
        'numWorkers': NumberofWorkers,
        'progressCallback': function(captureProgress) {
            var progress = lodash.floor(captureProgress * 100);
            $('#GIFprogress').css('width', progress.toString() + '%');
            $('#GIFprogress').html(progress.toString() + '%');
        }
    }, function (obj) {
        console.log(obj);
        var endTime = new Date();
        console.log('[GIF Generator] Used time: ' + ((endTime - startTime) / 1000).toString() + ' s');
        if (!obj.error) {
            setTimeout(function() {
                // 恢复窗口状态
                $("#CloseGIFWindow").css('display', 'block');
                $("#StartHour").removeAttr('disabled');
                $("#EndHour").removeAttr('disabled');
                $("#IntervalHour").removeAttr('disabled');
                $("#IntervalSecond").removeAttr('disabled');
                $("#NumberofWorkers").removeAttr('disabled');
                $("#CreateGIFButton").removeAttr('disabled');
                // 重置进度条
                $('#LoadingType').html('Image Loading');
                $('#GIFprogress').css('width', '0%');
                $('#GIFprogress').html('0%');
                var imageBlob = Base64toBlob(obj.image);
                window.open(blob2URL.createObjectURL(imageBlob));
                saveAs(imageBlob, "NumericalModelsGIF.png");
            }, 1000);
        } else {
            alert(obj.errorCode + ': ' + obj.errorMsg);
            // 恢复窗口状态
            $("#CloseGIFWindow").css('display', 'block');
            $("#StartHour").removeAttr('disabled');
            $("#EndHour").removeAttr('disabled');
            $("#IntervalHour").removeAttr('disabled');
            $("#IntervalSecond").removeAttr('disabled');
            $("#NumberofWorkers").removeAttr('disabled');
            $("#CreateGIFButton").removeAttr('disabled');
            // 重置进度条
            $('#LoadingType').html('Image Loading');
            $('#GIFprogress').css('width', '0%');
            $('#GIFprogress').html('0%');
        }
    });
}
