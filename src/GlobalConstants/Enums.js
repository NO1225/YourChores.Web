exports.urgency = {
    Low: 1,
    Medium: 2,
    High: 3,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "منخفض";
            case 2:
            case '2':
                return "متوسط";
            case 3:
            case '3':
                return "عالي";
        }
    }
}


exports.joinRequestType = {
    Join: 1,
    Invite: 2,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "طلب انظمام";
            case 2:
            case '2':
                return "دعوة";

        }
    }
}

exports.papulateOptions = (enums) => {
    var options = [];
    for (var key in enums) {
        if (enums.hasOwnProperty(key) && key != 'translate') {
            options.push({
                value: enums[key],
                text: enums.translate(enums[key]),
                key: `${enums[key]}`
            })
        }
    }
    return options;
}