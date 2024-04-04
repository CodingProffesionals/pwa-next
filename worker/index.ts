function sendMessage() {
    console.log('in the sendMessage function');
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
            id: 1,
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
self.addEventListener("sync", (event: any) => {
    console.log('called sync');
    if (event.tag == "send-message") {
        event.waitUntil(sendMessage());
    }
});