let formdatainprocess = "formdatainprocess";
async function sendMessage(formdatainprocess: any, event: any) {
    console.log('in the sendMessage function');
    let dataSend: any = '';
    await fetch('https://jsonplaceholder.typicode.com/posts/1', {
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
        .then((json) => {
            dataSend = json;
            console.log('submitted', json)
        });

    const dataToSend = dataSend;
    const modself: any = self;
    modself.clients.matchAll().then((clients: any) => {
        clients.forEach((client: any) => {
            client.postMessage(dataToSend);
        });
    });

}
self.addEventListener("sync", (event: any) => {
    // console.log('called sync', formdatainprocess);
    if (event.tag == "send-message") {
        event.waitUntil(sendMessage(formdatainprocess, event));
    }
});
self.addEventListener('message', (event: any) => {
    // const formData = event.data;
    // formdatainprocess = event.data
    // console.log('formdatainprocess', event.data);
    formdatainprocess = event.data;

    // const dataToSend = 'Hello this is our data to be used:::///';
    // const modself: any = self;
    // modself.clients.matchAll().then((clients:any) => {
    //   clients.forEach((client:any) => {
    //     client.postMessage(dataToSend);
    //   });
    // });
    // Process the form data, e.g., save it to IndexedDB or send it to the server when network is available
});