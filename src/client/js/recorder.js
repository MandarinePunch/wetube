import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile)); //ffmpeg에 recording파일 생성

  await ffmpeg.run("-i", files.input, "-r", "60", files.output); //input webm을 초당 60프레임의files.output 바꿈

  // await ffmpeg.run(
  //   "-i",
  //   files.input,
  //   "-ss",
  //   "00:00:01",
  //   "-frames:v",
  //   "1",
  //   files.thumbnail
  // ); //영상 썸네일 추출

  const mp4File = ffmpeg.FS("readFile", files.output);
  // const thumbFile = ffmpeg.FS("readFile", files.thumbnail);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  // const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  // const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  // downloadFile(thumbUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  // ffmpeg.FS("unlink", files.thumbnail);

  URL.revokeObjectURL(mp4Url);
  // URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  actionBtn.innerText = "Recording";
  actionBtn.disabled = true;
  actionBtn.removeEventListener("click", handleStart);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data); //다운로드를 위한 url을 브라우저가 생성
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    actionBtn.innerText = "Download";
    actionBtn.disabled = false;
    actionBtn.addEventListener("click", handleDownload);
  };
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 4000);
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    // video: {
    //   width: 1024,
    //   height: 576,
    // },
    video: false,
  });
  video.srcObject = stream;
  video.play();
};

init();

actionBtn.addEventListener("click", handleStart);
