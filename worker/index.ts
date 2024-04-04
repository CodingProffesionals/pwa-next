function sendMessage() {
    console.log('in the sendMessage function');
}
self.addEventListener("sync", (event: any) => {
    console.log('called sync');
    if (event.tag == "send-message") {
        event.waitUntil(sendMessage());
    }
});