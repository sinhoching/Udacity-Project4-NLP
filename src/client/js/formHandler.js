function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let url = document.getElementById('name').value;

    document.getElementById('frame').setAttribute('src', url);

    fetch('/analyze', {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url:url })
    })
    .then(res => res.json())
    .then(function(res) {
        console.log(res);
        //document.getElementById('results').innerHTML= JSON.stringify(res);
        document.getElementById('polarity').innerHTML= res.polarity;
        document.getElementById('subjectivity').innerHTML= res.subjectivity;
        document.getElementById('polarity_confidence').innerHTML= res.polarity_confidence;
        document.getElementById('subjectivity_confidence').innerHTML= res.subjectivity_confidence;
    })
}

export { handleSubmit }
