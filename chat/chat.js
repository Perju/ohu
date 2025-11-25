/**
 * funciones auxiliares
 * * * * * * * * * * * * * * */
async function fetchRecentMessages(channel) {
    try {
        const response = await fetch(
            `https://recent-messages.robotty.de/api/v2/recent-messages/${channel}`,
        );
        const data = await response.json();
        return data.messages;
    } catch (error) {
        console.error("Error fetching recent messages:", error);
        return [];
    }
}

function parseIRCMessage(rawMessage) {
    // Separar las partes del mensaje
    const parts = rawMessage.split(" :");
    if (parts.length <= 2) {
        return null;
    }

    // Obtener la sección de tags/metadatos
    const tagsSection = parts[0].split(" ")[0];
    const tags = {};

    // Parsear los tags si existen (comienzan con @)
    if (tagsSection.startsWith("@")) {
        tagsSection
            .substring(1)
            .split(";")
            .forEach((tag) => {
                const [key, value] = tag.split("=");
                tags[key] = value;
            });
    }

    // Obtener el usuario (está en la forma user!user@user.tmi.twitch.tv)
    const userSection = parts[0].split(" ")[1] || "";
    const username = userSection.split("!")[0];

    // Obtener el mensaje (todo lo que viene después del segundo :)
    const messageText = parts[2];

    return {
        tags: tags,
        username: username,
        message: messageText,
    };
}

function printMessage(msg) {
    const span = document.createElement("span");
    const hexColor = stringToColour(msg.tags["display-name"]);
    span.style =
        "color:" +
        hexColor +
        ";text-shadow: .5px .5px 1px " +
        invertColor(hexColor) +
        ";";
    span.appendChild(document.createTextNode(msg.tags["display-name"] + ":"));
    const text = document.createTextNode(msg.message);
    const li = document.createElement("li");
    li.appendChild(span);
    li.appendChild(text);
    // li.textContent = `${tags['display-name']}: ${message}`;
    lista.appendChild(li);
    if (lista.children.length > maxMessages) {
        lista.removeChild(lista.firstElementChild);
    }
}

/**
 * Aqui empieza el chat de twitch
 * * * * * * * * * * * * * * * * * * * */
const maxMessages = 20;
const lista = document.getElementById("mensajes");
const oldMessages = fetchRecentMessages(canal);
oldMessages.then((messages) => {
    messages.forEach((msg) => {
        const newMsg = parseIRCMessage(msg);
        if (newMsg == null) return;
        printMessage(newMsg);
    });
});

const client = new tmi.Client({
    identity: {
        username: botUsername,
        password: oauthToken,
    },
    channels: [canal],
});

client.connect();

client.on("message", (channel, tags, message, self) => {
    printMessage({ tags: tags, message: message });
});
