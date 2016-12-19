$(() => {

    let issueTypes = [
        { prefix: 'TA', name: 'Task' },
        { prefix: 'DE', name: 'Defect' },
        { prefix: 'US', name: 'User Story' },
        { prefix: 'Fe', name: 'Feature' },
        { prefix: 'Ca', name: 'Capability' },
        { prefix: 'Th', name: 'Theme' }
    ];

    let getIssueInfo = () => {
        return new Promise((resolve, reject) => {
            let currentIssue = {
                Id: document.getElementsByClassName('formatted-id')[0].innerText,
                Url: window.location.href
            };

            let currentIssuePrefix = currentIssue.Id.slice(0, 2);
            currentIssue.Type = issueTypes.filter((type) => type.prefix === currentIssuePrefix)[0];
            currentIssue.Title = document.querySelectorAll('input.simpleTextDetailField')[0].value;

            resolve(currentIssue);
        });
    };

    let toastrOptions = {
        "closeButton": false,
        "progressBar": false,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "showDuration": "200",
        "hideDuration": "500",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    let sendToBackground = (currentIssue) => {
        chrome.runtime.sendMessage({
            type: 'copy-to-clipboard',
            data: currentIssue
        }, ({isSuccess}) => {
            if (isSuccess) {
                toastr.success(`${currentIssue.Id} details copied to clipboard successfully`, null, toastrOptions);
            } else {
                // ignore.. probably not the issue page
            }
        });
    };

    let forbiddenTargets = ['INPUT', 'TEXTAREA']

    $('body').keyup((e) => {
        if (e.key === 'y' && !forbiddenTargets.includes(e.target.tagName)) {
            getIssueInfo()
                .then(sendToBackground);
        }
    });
});
