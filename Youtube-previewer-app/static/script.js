document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("videoURL");
    const preview = document.getElementById("preview");
    let timeout = null;

    input.addEventListener("input", () => {
        clearTimeout(timeout);
        const url = input.value;

        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            timeout = setTimeout(() => {
                fetch('/preview', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: url })
                })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        preview.style.display = "none";
                        return;
                    }

                    document.getElementById("title").textContent = data.title;
                    document.getElementById("channel").textContent = data.channel;
                    document.getElementById("duration").textContent = data.duration;
                    document.getElementById("thumbnail").src = data.thumbnail;
                    document.getElementById("videoLink").href = data.url;

                    preview.style.display = "block";
                })
                .catch(() => {
                    preview.style.display = "none";
                });
            }, 500);
        } else {
            preview.style.display = "none";
        }
    });
});
