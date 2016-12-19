var issueTypes = [
    { prefix: 'TA', name: 'Task' },
    { prefix: 'DE', name: 'Defect' },
    { prefix: 'US', name: 'User Story' },
    { prefix: 'Fe', name: 'Feature' },
    { prefix: 'Ca', name: 'Capability' },
    { prefix: 'Th', name: 'Theme' }
];

//////////////////////////////////
// Get info about current issue
//

var currentIssue = {
    Id: document.getElementsByClassName('formatted-id')[0].innerText,
    Url: window.location.href
};

var currentIssuePrefix = currentIssue.Id.slice(0,2);
currentIssue.Type = issueTypes.filter((type) => type.prefix === currentIssuePrefix)[0];
currentIssue.Title = document.querySelectorAll('input.simpleTextDetailField')[0].value;

//////////////////////////////////
// Prepare "mailto:" URL
//

var subject = currentIssue.Id;
var body = encodeURIComponent(`Type: ${currentIssue.Type.name}
ID: ${currentIssue.Id}
Title: ${currentIssue.Title}
URL: ${currentIssue.Url}
`);

window.location.href = `mailto:?subject=${subject}&body=${body}`;