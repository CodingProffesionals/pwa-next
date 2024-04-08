let formdatainprocess = "formdatainprocess";
function sendMessage(formdatainprocess: any) {
    console.log('in the sendMessage function');
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
        method: 'PUT',
        body: JSON.stringify({
            id: 1,
            title: formdatainprocess?.title,
            body: formdatainprocess?.body,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log('submitted', json));
}
self.addEventListener("sync", (event: any) => {
    // console.log('called sync', formdatainprocess);
    console.log('called sync');
    if (event.tag == "send-message") {
        event.waitUntil(sendMessage(formdatainprocess));
    }
});
self.addEventListener('message', event => {
    // const formData = event.data;
    // formdatainprocess = event.data
    // console.log('formdatainprocess', event.data);

    formdatainprocess = event.data
    // Process the form data, e.g., save it to IndexedDB or send it to the server when network is available
});