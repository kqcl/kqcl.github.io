const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const spotify_url = 'https://nyaw.me/api/';

const cmdHistory = [];
let cmdIndex = 0;

function scrollToBottom() {
    document.querySelectorAll('.terminal-body')[0].scrollIntoView(false);
}

function printMessage(message) {
    terminalOutput.innerHTML += `<div>${message}</div>`;
    scrollToBottom();
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
        case 'spotify':
            displaySpotify();
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
            handleCommand(command);
            terminalInput.value = '';
            cmdIndex = cmdHistory.length; 
            break;
        case 'ArrowUp':
            if (cmdIndex > 0) {
                cmdIndex--;
                terminalInput.value = cmdHistory[cmdIndex];
            }
            setTimeout(() => {
                terminalInput.selectionStart = terminalInput.selectionEnd = cmdHistory[cmdIndex].length;
            }, 0);
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
            <li><span class="glow">spotify</span> = Display the song I am currently listening to on spotify</li>
            <li><span class="glow">su</span> = Switch to superuser (only use it if you have root privileges)</li>
        </ul>
    `;
    printMessage(helpMessage);
}

function displayAboutMe() {
    const whoisMessage = `
        <p>haiiiii :3333<br>
        i'm just some girl from germany who's interested cs, currently in high school :3<br>
        i'm quite familiar with ts & py, did a little rust and swift and am now mainly focussing on go (love the lang)<br>
        i'm a huge vim fan - spent wayy too much time on my neovim config - dotfiles are somewhere in my repos btww<br>
        on the off-chance you would wanna chat, just add me on dc (@kqcl) - always happy to have someone to talk to<br>
        im a huge reading fan, nothing beats a good book (maybe cats but that's it) - also life without music would be pointless ngl<br>
        anywaysss - if you've read this far, tyy and have a nice dayy - you're awesome <3333
    `;
    printMessage(whoisMessage);
} 

function clearTerminal() {
    terminalOutput.innerHTML = '';
}

function displayHistory() {
    printMessage(`<p>${cmdHistory.join('<br>')}</p>`);
} 

async function displayIp() {
    const msg = `The paradox of "Who am I?" is: we never know, but, we constantly find out.`;
    printMessage(msg);
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const Ipmsg = `On that note - to me you are just <span class="glow">${data.ip}</span> :3`;
        printMessage(Ipmsg);
    } catch (error) {
        console.log('An Error occurred: ' + error.message);
    }
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


async function fetchCurrentlyPlaying() {
    try {
        const response = await fetch(spotify_url + '/currently-playing');
        if (!response.ok) {
            throw new Error('Failed to fetch currently playing song');
        }
        const data = await response.json(); 
        return data; 
    } catch (error) {}
}

async function fetchLastListenedSong() {
    try {
        const response = await fetch(spotify_url + '/last-listened');
        if (!response.ok) {
            throw new Error('Failed to fetch last played song');
        }
        const data = await response.json();
        return data;
    } catch (error) {}
}


async function displaySpotify() {
    try {
        printMessage('Fetching currently playing song...');
        const data = await fetchCurrentlyPlaying();

        if (data.item) {
            const message = `
                <p>Currently playing:</p>
                <ul>
                    <li>Name: ${data.item.name}</li>
                    <li>Artist: ${data.item.artists[0].name}</li>
                    <li>Album: ${data.item.album.name}</li>
                    <li>Direct-Link: <a href="${data.item.external_urls.spotify}" target="_blank">${data.item.external_urls.spotify}</a></li>
                </ul>
            `;
            printMessage(message);
        } else {
            printMessage('I\'m not listening to anything right now, but the last track I listened to was:');
            const lastListenedSong = await fetchLastListenedSong();
            const message = `
                <ul>
                    <li>Name: ${lastListenedSong.name}</li>
                    <li>Artist: ${lastListenedSong.artist}</li>
                    <li>Album: ${lastListenedSong.album}</li>
                    <li>Direct-Link: <a href="${lastListenedSong.direct_link}" target="_blank">${lastListenedSong.direct_link}</a></li>
                </ul>
            `;
            printMessage(message);
        }
    } catch (error) {
        const errorMessage = `Error fetching currently playing song: ${error.message}`;
        printMessage(errorMessage);
    }
}


function displayErrorMessage() {
    printMessage(`Error: Command not found. Type <span class="glow">'help'</span> for a list of available commands.`);
}
