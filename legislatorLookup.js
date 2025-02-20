async function findLegislator(zipCode) {
    const token = 'CAB8175D741ADD5B0CB504C64D804D69';
    const response = await fetch(`https://glen.le.utah.gov/legislators/${token}`);
    const legislators = await response.json();
    
    const matchedLegislators = legislators.filter(legislator => legislator.zip === zipCode);
    return matchedLegislators;
}

function generateMessage() {
    const messages = [
        "Utah needs smart aggregate policy now—costs are rising!",
        "Support efficient permitting and pre-zoning before it’s too late!",
        "Infrastructure and housing affordability depend on this reform!",
        "Fixing inefficiencies will keep Utah competitive and growing!",
        "Without action, construction costs will keep climbing!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

function generateEmail(legislator, zipCode, email) {
    const subject = `Constituent from ${zipCode} Urges Support for Aggregate Reform`;
    const body = `Dear ${legislator.name},\n\nI am reaching out as your constituent in ${zipCode} to request your support for urgent aggregate supply reforms. Rising costs due to inefficiencies in permitting and supply chain logistics are placing unnecessary burdens on Utah businesses and taxpayers.\n\nA recent study confirms that long-haul transportation costs alone are adding $4,000 to the price of a new home and $1 million per mile of highway. Streamlining permitting and pre-zoning high-potential resource areas are necessary steps to stabilize costs and support Utah's economic growth.\n\nI urge you to take action before the legislative session ends.\n\nSincerely,\n[Your Name]\n[Your Address]\n[Your Email: ${email}]`;
    return `mailto:${legislator.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

async function handleFindLegislator() {
    const zipCode = document.getElementById('zipInput').value;
    const email = document.getElementById('emailInput').value;
    const legislators = await findLegislator(zipCode);
    
    if (legislators.length > 0) {
        const legislator = legislators[0];
        const mailtoLink = generateEmail(legislator, zipCode, email);
        document.getElementById('emailButton').href = mailtoLink;
        document.getElementById('emailButton').style.display = 'block';
        document.getElementById('messageDisplay').innerText = generateMessage();
    } else {
        alert('No legislators found for this ZIP code. Please try again.');
    }
}

const htmlContent = `
    <label for='zipInput'>Enter Your ZIP Code:</label>
    <input type='text' id='zipInput' placeholder='ZIP Code'>
    <label for='emailInput'>Enter Your Email:</label>
    <input type='text' id='emailInput' placeholder='Your Email'>
    <button onclick='handleFindLegislator()'>Find My Legislator</button>
    <p id='messageDisplay'></p>
    <a id='emailButton' style='display:none;' target='_blank'>Send Email</a>
`;

document.body.innerHTML += htmlContent;
