function getQuery(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    console.log("here", decodeURIComponent(results[2].replace(/\+/g, ' ')))
    return decodeURIComponent(results[2].replace(/\+/g, ' ')) && decodeURIComponent(results[2].replace(/\+/g, ' ')).trim() == "" ? null : decodeURIComponent(results[2].replace(/\+/g, ' ')).trim();
}


let d = { lang: "", from: 0, to: "", edit: "true", dm: "off" };

function showEmd(e) {

    if (e == "re") {
        d.gist = `emd.html?lang=${d.lang}&from=${d.from}&to=${d.to}&code=${d.code}&edit=${d.edit}&dm=${d.dm}`;
        console.log(d.gist)
        document.getElementById("previewFrame").src = d.gist;
        return;
    }

    if (!e.value || e.value.trim() == "") {
        return;
    }


    if (e.id == "code") {
        d.code = e.value;
    }

    if (e.id == "from") {
        d.from = e.value;
    }

    if (e.id == "to") {
        d.to = e.value;
    }

    if (e.id == "dm") {
        d.dm = e.value;
    }

    if (e.id == "edit") {
        d.edit = e.value;
    }

    if (e.id == "lang") {
        d.lang = e.value;
        // $(".type").html(d.lang);

    }

    d.gist = `emd.html?lang=${d.lang}&from=${d.from}&to=${d.to}&code=${d.code}&edit=${d.edit}&dm=${d.dm}`;
    document.getElementById("previewFrame").src = d.gist;
}

function createGist() {


    $(".results").css("display", "block")
    document.querySelector(".script").innerHTML = `<pre><code>${window.location.href.split('/').slice(0, 3).join('/') + "/" + d.gist}</code></pre>`

    document.querySelector(".frame").innerHTML = `<pre><code>&lt;iframe src="${window.location.href.split('/').slice(0, 3).join('/') + "/" + d.gist}" width="100%" height="330" frameborder="0"&gt;&lt;/iframe&gt;</code></pre>`
}

async function refresfInp() {
    for (const k in d) {
        if ($(`#${k}`)) {
            $(`[for=${k}]`).click();
            $(`#${k}`).click();
            $(`#${k}`).val(d[k]);
            console.log(k, d[k])
        }
    }

    await showEmd("re");
}

function preview(e) {

    if (!e.value || e.value.trim() == "") {
        return;
    }

    if (getQuery("code", e.value)) {
        d.code = getQuery("code", e.value);
    }

    if (getQuery("from", e.value)) {
        d.from = getQuery("from", e.value);
    }

    if (getQuery("to", e.value)) {
        d.to = getQuery("to", e.value);
    }

    if (getQuery("dm", e.value)) {
        d.dm = getQuery("dm", e.value);
    }

    if (getQuery("edit", e.value)) {
        d.edit = getQuery("edit", e.value);
    }

    if (getQuery("lang", e.value)) {
        d.lang = getQuery("lang", e.value);
    }

    refresfInp();
}

$(".frame").on('click', function () {
    navigator.clipboard.writeText($(this).text());

    /* Alert the copied text */
    swal("Copied", $(this).text(), "success");
})

$(".script").on('click', function () {
    navigator.clipboard.writeText($(this).text());

    /* Alert the copied text */
    swal("Copied", $(this).text(), "success");
})


function expandFrame() {
    $('.preview').toggleClass('fullscreen');
}