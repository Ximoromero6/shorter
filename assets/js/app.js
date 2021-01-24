function shortener(evt) {

    let data = document.querySelector("#url"),
        url = `https://api.shrtco.de/v2/shorten?url=${data.value}`,
        xhr = new XMLHttpRequest();

    if (data.value != "" && data.value != null) {
        evt.target.classList.add("is-loading");
        data.classList.remove("is-danger");
        document.querySelector("span.error").classList.remove("show");

        xhr.open('GET', url);
        xhr.send();

        xhr.onload = function() {
            if (xhr.status != 200) {
                evt.target.classList.remove("is-loading");


                let new_link = document.createElement("div");
                new_link.classList.add("new_link");

                let left = document.createElement("div"),
                    right = document.createElement("div");

                left.classList.add("left");
                right.classList.add("right");

                let text = document.createElement("p");
                text.appendChild(document.createTextNode(data.value));
                left.appendChild(text);

                let link = document.createElement("a");
                link.textContent = JSON.parse(this.response).result.full_short_link2;
                link.href = JSON.parse(this.response).result.full_short_link2;
                link.target = "_blank";
                right.appendChild(link);

                let button = document.createElement("button");
                button.textContent = "Copy";
                button.classList.add("button", "is-primary");
                button.addEventListener("click", () => {
                    button.classList.add("copied");
                    const el = document.createElement('textarea');
                    el.value = JSON.parse(this.response).result.full_short_link2;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                    button.textContent = "Copied!";
                });
                right.appendChild(button);

                new_link.appendChild(left);
                new_link.appendChild(right);

                document.querySelector("#resultado").appendChild(new_link);
            } else {
                console.log(`2: ${this.response}`);
            }
        };

        xhr.onprogress = function(event) {
            if (event.lengthComputable) {
                console.log(`Event 1: ${JSON.stringify(event)}`);
            } else {
                console.log(`Event 2: ${JSON.stringify(event)}`);
            }

        };

        xhr.onerror = function() {
            console.log("Request failed");
        };

    } else {
        data.classList.add("is-danger");
        document.querySelector("span.error").classList.add("show");
    }
}