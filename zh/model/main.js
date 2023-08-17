var lodash = _;
var __ajaxRequestHistory;
var __region = () => $("#region").val();
var __hours;
var __modelHourPlayTimer;
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
    'ir0': 'irbwd',
    'ir1': 'irbd',
    'ir2': 'irott',
    'ir3': 'irca',
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
    'apcp': 'apcp',
    'prate': 'prate',
    'cape': 'cape',
    'ow': 'ow',
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
        $("#more").html('更多');
        $("#more").removeClass('active');
        $("button.hbtn").removeClass("active");
        $("#hourSelected").val(value);
        $("button.hbtn[value=" + value + "]").addClass("active");
        submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
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
        img_wp = ['pres', 'wp', 'sgust', 'w200pres', 'sh200-850pres'];
        img_rhw = ['rhw850', 'rhw700', 'rhw1000'];
        img_vort = ['z500rvw850', 'rvw700_pres', 'zrv500w200'];
        img_anom = ['t2ma', 't850a', 'z500a', 'z10t10a'];
        img_other = ['refc', 'sweat', 'tt', 'ki', 'cape', 'ow', 'tcdc'];
        imgName_ir = ['Simulated IR-BW', 'Simulated IR-BD', 'Simulated IR-OTT', 'Simulated IR-CA'];
        imgName_prec = ['Precipitation Rate', 'Total Precipitation'];
        imgName_temp = ['2m Air Temp.', '2m DP Temp.', '850mb Temp. & Wind', '700mb Temp. & Wind', '500mb HGT & 850mb Temp.', '100mb HGT & 850mb Temp.', '200mb HGT & Wind', '10mb HGT & Temp.', 'Tropopause Temperature', 'Highest Tropospheric Freezing Level'];
        imgName_wp = ['Mean Sea Level Pressure', '10m Wind & MSLP', 'Surface Wind Gust', '200mb Wind & MSLP', '200-850mb Wind Shear & MSLP'];
        imgName_rhw = ['850mb RH. & Wind', '700mb RH. & Wind', '1000mb RH. & Wind'];
        imgName_vort = ['500mb HGT & 850mb Vort. & Wind', '700mb Vort. & Wind & MSLP', '500mb HGT & Vort. & 200mb Wind'];
        imgName_anom = ['2m Air Temp. Anomaly', '850mb Temp. Anomaly', '500mb HGT Anomaly', '10mb HGT & Temp. Anomaly'];
        imgName_other = ['Composite Reflectivity', 'SWEAT Index', 'Total Totals Index', 'K-Index', 'Convective Available Potential Energy', '850mb Okubo-Weiss', 'Total Cloud Cover'];
        img = [
            [img_temp, imgName_temp],
            [img_wp, imgName_wp],
            [img_ir, imgName_ir],
            [img_prec, imgName_prec],
            [img_rhw, imgName_rhw],
            [img_vort, imgName_vort],
            [img_anom, imgName_anom],
            [img_other, imgName_other]
        ];
        imgTitle = ['Temperature', 'Wind / MSLP', 'Simulated IR', 'Precipitation', 'RH. & Wind', 'Vorticity', 'Anomalies', 'Others'];
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
            'z500t850': _region,
            'z100t850': _region,
            'zw200': _region,
            'z500a': _region,
            'refc': _region,
            'sweat': _region,
            'tt': _region,
            'ki': _region,
            'rhw850': _region,
            'rhw700': _region,
            'rhw1000': _region,
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
        img_wp = ['pres', 'wp', 'w200pres', 'sh200-850pres'];
        img_rhw = ['rhw850', 'rhw700', 'rhw1000'];
        img_anom = ['t2ma', 't850a', 'z500a', 'z10t10a'];
        img_other = ['sweat', 'tt', 'ki', 'cape'];
        imgName_ir = ['Simulated IR-BW', 'Simulated IR-BD', 'Simulated IR-OTT'];
        imgName_prec = ['Precipitation Rate', 'Total Precipitation'];
        imgName_temp = ['2m Air Temp.', '2m DP Temp.', '850mb Temp. & Wind', '700mb Temp. & Wind', '500mb HGT & 850mb Temp.', '100mb HGT & 850mb Temp.', '200mb HGT & Wind', '10mb HGT & Temp.'];
        imgName_wp = ['Mean Sea Level Pressure', '10m Wind & MSLP', '200mb Wind & MSLP', '200-850mb Wind Shear & MSLP'];
        imgName_rhw = ['850mb RH. & Wind', '700mb RH. & Wind', '1000mb RH. & Wind'];
        imgName_anom = ['2m Air Temp. Anomaly', '850mb Temp. Anomaly', '500mb HGT Anomaly', '10mb HGT & Temp. Anomaly'];
        imgName_other = ['SWEAT Index', 'Total Totals Index', 'K-Index', 'Convective Available Potential Energy'];
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
            'z500t850': _region,
            'z100t850': _region,
            'zw200': _region,
            'z500a': _region,
            'sweat': _region,
            'tt': _region,
            'ki': _region,
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
        img_wp = ['pres', 'wp', 'w200pres', 'sh200-850pres'];
        img_rhw = ['rhw850', 'rhw700', 'rhw1000'];
        img_anom = ['t2ma', 't850a', 'z500a'];
        img_other = ['sweat', 'tt', 'ki', 'cape'];
        // imgName_prec = ['Precipitation Rate', 'Total Precipitation'];
        imgName_prec = ['Total Precipitation'];
        imgName_temp = ['2m Air Temp.', '2m Max. Temp.', '2m Min. Temp.', '2m DP Temp.', '850mb Temp. & Wind', '700mb Temp. & Wind', '500mb HGT & 850mb Temp.', '100mb HGT & 850mb Temp.', '200mb HGT & Wind'];
        imgName_wp = ['Mean Sea Level Pressure', '10m Wind & MSLP', '200mb Wind & MSLP', '200-850mb Wind Shear & MSLP'];
        imgName_rhw = ['850mb RH. & Wind', '700mb RH. & Wind', '1000mb RH. & Wind'];
        imgName_anom = ['2m Air Temp. Anomaly', '850mb Temp. Anomaly', '500mb HGT Anomaly'];
        imgName_other = ['SWEAT Index', 'Total Totals Index', 'K-Index', 'Convective Available Potential Energy'];
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
            'z500t850': _region,
            'z100t850': _region,
            'zw200': _region,
            'z500a': _region,
            'sweat': _region,
            'tt': _region,
            'ki': _region,
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
        img_wp = ['pres', 'wp', 'w200pres', 'sh200-850pres'];
        img_rhw = ['rhw850', 'rhw700', 'rhw1000'];
        img_vort = ['z500rvw850', 'rvw700_pres', 'zrv500w200'];
        img_anom = ['t2ma', 't850a', 'z500a'];
        img_other = ['sweat', 'tt', 'ki', 'ow'];
        imgName_prec = ['Total Precipitation'];
        imgName_temp = ['2m Air Temp.', '850mb Temp. & Wind', '700mb Temp. & Wind', '500mb HGT & 850mb Temp.', '200mb HGT & Wind'];
        imgName_wp = ['Mean Sea Level Pressure', '10m Wind & MSLP', '200mb Wind & MSLP', '200-850mb Wind Shear & MSLP'];
        imgName_rhw = ['850mb RH. & Wind', '700mb RH. & Wind', '1000mb RH. & Wind'];
        imgName_vort = ['500mb HGT & 850mb Vort. & Wind', '700mb Vort. & Wind & MSLP', '500mb HGT & Vort. & 200mb Wind'];
        imgName_anom = ['2m Air Temp. Anomaly', '850mb Temp. Anomaly', '500mb HGT Anomaly'];
        imgName_other = ['SWEAT Index', 'Total Totals Index', 'K-Index', '850mb Okubo-Weiss'];
        img = [
            [img_temp, imgName_temp],
            [img_wp, imgName_wp],
            [img_prec, imgName_prec],
            [img_rhw, imgName_rhw],
            [img_vort, imgName_vort],
            [img_anom, imgName_anom],
            [img_other, imgName_other]
        ];
        imgTitle = ['Temperature', 'Wind / MSLP', 'Precipitation', 'RH. & Wind', 'Vorticity', 'Anomalies', 'Others'];
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
            'z500t850': _region,
            'zw200': _region,
            'z500a': _region,
            'sweat': _region,
            'tt': _region,
            'ki': _region,
            'rhw850': _region,
            'rhw700': _region,
            'rhw1000': _region,
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
        var {
            'img': img,
            'imgTitle': imgTitle,
            'region': region,
            'file': file
        } = _getModelSettings($("#model").val());
        $("#customize").css('display', 'none');
        $("#gfsimg").css('display', 'none');
        // $("#area").val(region[$("#imgType").val()][0][0]);
        if (lodash.includes(['ECMWF', 'ICON'], $("#model").val())) {
            let html = '';
            let hours = getModelForecastHours($("#model").val(), $("#runtime").val(), fp[$("#imgType").val()], false);
            __hours = hours;
            for (let i = 0; i < hours.length; i++) {
                html += '<button type="button" class="hbtn" onclick="changeFcstHourValue(\'' + hours[i].toString() + '\', false);" value=' + hours[i].toString() + '>' + hours[i].toString() + '</button>';
            }
            $("#hours").html(html);
            changeFcstHourValue(hours[0], false);
        }
        submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
    });
    $("#model").on('change', () => {
        var {
            'img': img,
            'imgTitle': imgTitle,
            'region': region,
            'file': file
        } = _getModelSettings($("#model").val());
        $("#customize").css('display', 'none');
        $("#gfsimg").css('display', 'none');
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
                changeFcstHourValue(hours[0], false);
                submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
            },
            dataType: "text",
            error: function() {
                $("#image").html("<div class=\"ace-container\">网络出错了，无返回数据</div>");
            }
        });
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

function getImageryCacheURL(model, runtime, fcsthour, imgType, area, protocol) {
    let format;
    let geo = area == 'customize' ? georange[area]().split(',') : georange[area].split(',');
    let geoFormat = lodash.includes(['chinamerc', 'northpolar', 'southpolar', 'euroasia', 'europe', 'northamerica'], area) ? georange[area].split(',').join("_") : $.sprintf('%.1f_%.1f_%.1f_%.1f', geo[0], geo[1], geo[2], geo[3]);
    switch (model) {
        case 'GFS':
            format = $.sprintf('%s//data.dapiya.top/satellite/%s/data/%s_%s_f%03d_%s_%s.png', protocol, model.toLowerCase(), model.toLowerCase(), fp[imgType], fcsthour, runtime, geoFormat, );
            break;
        case 'ICON':
            format = $.sprintf('%s//data.dapiya.top/satellite/%s/data/%s_%s_f%03d_%s_%s.png', protocol, model.toLowerCase(), model.toLowerCase(), fp[imgType], fcsthour, runtime, geoFormat, );
            break;
        case 'CMC':
            format = $.sprintf('%s//data.dapiya.top/satellite/%s/data/gem_%s_f%03d_%s_%s.png', protocol, model.toLowerCase(), fp[imgType], fcsthour, runtime, geoFormat, );
            break;
        case 'ECMWF':
            let initHour = runtime.slice(runtime.length - 2, runtime.length);
            let mode = lodash.includes(['06', '18'], initHour) ? 'scda' : 'oper';
            format = $.sprintf('%s//data.dapiya.top/satellite/%s/data/%s0000_%dh_%s_fc_%s_%s.png', protocol, model.toLowerCase(), runtime, fcsthour, mode, fp[imgType], geoFormat, );
            break;
        default:
            format = '';
    }
    if (protocol.includes('https')) format = format.replace('net:1234', 'top')
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
    $("#" + boxID + "Title").html("预报时间步长");
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
    html = '<button type="button" class="btn btn-primary" id="checkButton">选择</button>\
            <button type="button" class="btn btn-primary" id="uncheckButton">关闭</button>';
    $("#" + boxID + "Footer").html(html);
    $("#checkButton").attr('disabled', 'disabled');
    $("#checkButton").click(function() {
        $("#" + boxID).modal('hide');
        $("#hourSelected").val($("#hourSelectedFull").val());
        submit_data($("#model").val(), $("#runtime").val(), $("#hourSelected").val(), $("#area").val(), $("#imgType").val());
        if (!lodash.includes(notIncludeHours, parseInt($("#hourSelected").val()))) {
            $("#more").html($.sprintf("+%03dH", $("#hourSelected").val()));
            $("#more").addClass('active');
            $("#hours").scrollTop(0);
        } else {
            $("#more").html('更多');
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
