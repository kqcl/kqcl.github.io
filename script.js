const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const cmdHistory = [];
let cmdIndex = 0;


function scrollToBottom() {
    document.querySelectorAll('.terminal-body')[0].scrollIntoView(false);
}

function printMessage(message) {
    terminalOutput.innerHTML += `<div>${message}</div>`;
}

function handleCommand(command) {
    cmdHistory.push(command);
    switch (command) {
        case 'socials':
            displaySocialLinks();
            break;
        case 'help':
            displayHelp();
            break;
        case 'whois':
            displayAboutMe();
            break;
        case 'clear':
            clearTerminal();
            break;
        case 'history':
            displayHistory();
            break;
        case 'whoami':
            displayIp();
            break;
        case 'su':
            handleSudo();
            break;
        case 'time':
            displayDateTime();
            break;
        default:
            displayErrorMessage();
    }
}

terminalInput.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'Enter':
            const command = terminalInput.value.trim().toLowerCase();
            printMessage(`<span style="color: orange">visitor</span><span class="glow">@</span>kqcl<span style="color: lightgreen;"> ➜</span> <span style="color: lightblue;">~</span> $ ${command}`);
            terminalInput.value = '';
            handleCommand(command);
            cmdIndex = cmdHistory.length; 
            scrollToBottom();
            break;
        case 'ArrowUp':
            if (cmdIndex > 0) {
                cmdIndex--;
                terminalInput.value = cmdHistory[cmdIndex];
                setTimeout(() => {
                    terminalInput.selectionStart = terminalInput.selectionEnd = cmdHistory[cmdIndex].length;
                }, 0);
            }
            break;
        case 'ArrowDown':
            if (cmdIndex < cmdHistory.length - 1) {
                cmdIndex++;
                terminalInput.value = cmdHistory[cmdIndex];
            } else {
                terminalInput.value = '';
            }
            break;
    }
});

function displaySocialLinks() {
    const socialLinks = `
        <p>My Social Media Profiles:</p>
        <ul>
            <li><span class="yellow">discord</span> = <span class="glow">@kqcl</span></li>
            <li><span class="yellow">github</span> = <span class="glow"><a href="https://github.com/kqcl" target="_blank">github.com/kqcl</a></span></li>
            <br>
            <li>i just noticed i don't have any other public social media qwq</li>
        </ul>
    `;
    printMessage(socialLinks);
}

function displayHelp() {
    const helpMessage = `
        <p>Available commands:</p>
        <ul>
            <li><span class="glow">whois</span> = Learn some stuff about who I am</li>
            <li><span class="glow">whoami</span> = Yes, who are you?</li>
            <li><span class="glow">socials</span> = Display links to my social media profiles</li>
            <li><span class="glow">help</span> = If you are reading this you already know what this command does :)</li>
            <li><span class="glow">clear</span> = Clear the terminal</li>
            <li><span class="glow">history</span> = Show your recently used commands</li>
            <li><span class="glow">time</span> = Display the current date and time</li>
            <li><span class="glow">su</span> = Switch to superuser (only use it if you have root privileges)</li>
        </ul>
    `;
    printMessage(helpMessage);
}

function displayAboutMe() {
    const whoisMessage = `
        <p>Hey :3<br>
        I am a random kid from germany who likes to code in his free time, really loves cats, is pretty socially awkward and yes :)<br>
        I'm quite familiar with <span class="yellow">TypeScript</span> and <span class="yellow">Python</span>, know quite a bit of <span class=yellow>swift</span> and am currently learning <span class="yellow">Rust</span> (I kind of love it alr);<br>
        My tooling consist of an arch linux machine and neovim - the dotfiles are on my github if anyone cares.<br>
        You can always write me a dm via discord <span class="glow">@kqcl</span> - I'm always happy to have someone to talk to xD<br>
        Well, yea - that's pretty much it - nom nom out :D
    `;
    printMessage(whoisMessage);
} 

function clearTerminal() {
    terminalOutput.innerHTML = '';
}

function displayHistory() {
    printMessage(`<p>${cmdHistory.join('<br>')}</p>`);
} 

function displayIp() {
    let msg;
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            msg = `The paradox of "Who am I?" is: we never know, but, we constantly find out.<br>On that note - to me you are just <span class="glow">${data.ip}</span> :3`;
        })
        .catch(error => {
            msg = `The paradox of "Who am I?" is: we never know, but, we constantly find out.`;
            console.log('An Error occured: ' + error.message);
        })
        .then(() => printMessage(msg));
}

function handleSudo() {
    printMessage("<p>I told you not to run this unless you're an admin qwq</p>")
    setTimeout(() => {
        window.location.replace("https://www.youtube.com/watch?v=ALiLGgn3YGM");
    }, 1500);
}

function displayDateTime() {
    const currentDate = new Date();
    printMessage(`${currentDate.toLocaleString()}`);
}

function displayErrorMessage() {
    printMessage(`Error: Command not found. Type <span class="glow">'help'</span> for a list of available commands.`);
}
