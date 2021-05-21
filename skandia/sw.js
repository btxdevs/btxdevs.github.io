self.addEventListener('activate', (event) => {
    console.info('Event: Activate');
    event.waitUntil(
        self.clients.claim(),
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', function(event) {
   console.log('WORKER: Fetching', event.request);

   if (event.request.method === "POST") {
            var requestClone = event.request.clone();

            requestClone.json().then(function(value) {

                    console.log('WORKER: Request', event.request);

                     try {
                         HostApp.request(request.url, value)
                        } catch (error) {
                       console.error(error);
                     }

                  console.log(value);
            }).catch(err => console.log(err));
   }


  event.respondWith(fetch(event.request).then(function(response) {
      if (response.type === 'opaque') {
        return response;
      }

        console.log('WORKER: Response', response);

        var contentType = response.headers.get('Content-Type');

        if(contentType.includes("application/json")){
                var responseClone = response.clone();
               responseClone.text().then(function(value) {
                        try {
                              HostApp.response(response.url, value)
                        } catch (error) {
                          console.error(error);
                        }
                          console.log(value);
               });
        }


      return response;
    })
  )
});