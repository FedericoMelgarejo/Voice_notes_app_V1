const btn = document.getElementById("record-button");
const preview = document.getElementById("preview");
const saveBtn = document.getElementById("save-button");
let file;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia(
      // constraints - only audio needed for this app
      {
        audio: true,
      }
    )

    // Success callback
    .then(function (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      btn.onmousedown = () => {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        btn.className = "btn btn-success mx-3";
        btn.innerText = "Recording...";
      };
      let chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      btn.onmouseup = (e) => {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
        btn.className = "btn btn-secondary mx-3";
        btn.innerText = "Record";
      };

      mediaRecorder.onstop = (e) => {
        const blob = new Blob(chunks, {
          type: "audio/ogg; codecs=opus"
        });
        chunks = [];
        const audioUrl = window.URL.createObjectURL(blob);
        preview.src = audioUrl;
        file = blob;
      };
    })

    // Error callback
    .catch(function (err) {
      console.log("The following getUserMedia error occurred: " + err);
    });
} else {
  console.log("getUserMedia not supported on your browser!");
}

saveBtn.onclick = async (e) => {
  const title = document.getElementById("title");
  const addressee = document.getElementById("addressee");
  const formData = new FormData();
  formData.append("record", file);
  formData.append("title", title.value);
  formData.append("addressee", addressee.value);

  await fetch("/api/v1/records", {
    method: "POST",
    body: formData,
  });
};