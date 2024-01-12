/* eslint-disable no-undef */

importScripts(
  'https://www.gstatic.com/firebasejs/9.16.0/firebase-app-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore-compat.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/9.16.0/firebase-messaging-compat.js'
)

const firebaseConfig = {
  // Firebaseで取得した情報を追記してください。
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message 0626',
    payload
  )
  // Customize notification here
  const notificationTitle = payload.data.title
  const notificationOptions = {
    body: payload.data.body,
    icon: '/resized_image512_1.15_2023_0422_040529.png',
    data: payload.data,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

let currentNotification = null

self.addEventListener('push', async (event) => {
  try {
    const notificationData = event.data.json()
    const uid = notificationData.data.uid
    const syncEvent = 'pushNotification'
    // const location = (await getLocation()) || {}
    // const { Latitude = null, Longitude = null } = location

    // 同期処理
    await syncData({
      uid,
      currentNotification,
      syncEvent,
      // Latitude, Longitude
    })

    // キャッシュのクリア処理
    await clearCaches()

    console.log('Sync data and cache clearing succeeded')
  } catch (error) {
    console.error('Failed to process push event:', error)
  }
})

self.addEventListener('notificationclick', (event) => {
  try {
    const data = event.notification.data
    const uid = data.uid
    const url = data.url
    const targetUrl = url || '/information'
    const syncEvent = 'notificationclick'
    // const location = (await getLocation()) || {}
    // const { Latitude = null, Longitude = null } = location
    currentNotification = event.notification

    event.waitUntil(
      focusOrOpenClient(targetUrl).then(() =>
        syncData({
          uid,
          currentNotification,
          syncEvent,
          // Latitude, Longitude
        })
      )
    )
  } catch (error) {
    console.error('Failed to process notification click:', error)
  }
})

async function focusOrOpenClient(targetUrl) {
  const windowClients = await clients.matchAll({
    type: 'window',
    includeUncontrolled: true,
  })

  for (const client of windowClients) {
    if (client.url === targetUrl && 'focus' in client) {
      return client.focus()
    }
  }

  return clients.openWindow(targetUrl)
}

// 定期同期処理
async function syncData({
  uid,
  currentNotification,
  syncEvent,
  // Latitude,
  // Longitude,
}) {
  try {
    const now = Date.now()
    const date = new Date(now)
    const currentDateAndTime = date.toLocaleString()

    const syncData = {
      uid,
      syncTime: currentDateAndTime,
      syncEvent,
      // Latitude,
      // Longitude,
    }

    const db = await firebase.firestore()
    const syncRef = db.collection('syncInterval')

    await syncRef.add(syncData)

    console.log('Data synchronized successfully')
  } catch (error) {
    console.error('Failed to synchronize data:', error)
  } finally {
    if (currentNotification) {
      currentNotification.close()
    }
  }
}

// キャッシュクリア処理
async function clearCaches() {
  const cacheNames = await caches.keys()
  const cacheDeletePromises = cacheNames.map((name) => caches.delete(name))
  return Promise.all(cacheDeletePromises)
}

// 位置情報取得
// function getLocation() {
//   return new Promise((resolve, reject) => {
//     if ('geolocation' in navigator) {
//       // ユーザーの現在位置を取得
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const Latitude = position.coords.latitude
//           const Longitude = position.coords.longitude
//           console.log('Latitude:', Latitude)
//           console.log('Longitude:', Longitude)
//           resolve({ Latitude, Longitude })
//         },
//         (error) => {
//           console.error('Error getting location:', error)
//           reject(error)
//         }
//       )
//     } else {
//       console.error('Geolocation is not available in this browser.')
//       reject(new Error('Geolocation is not available in this browser.'))
//     }
//   })
// }

//
// 新規タブで開くコード
// self.addEventListener('notificationclick', (event) => {
//   const data = event.notification.data
//   console.log('data', data)
//   const targetUrl = data && data.url ? data.url : '/'
//   event.notification.close()
//   event.waitUntil(
//     clients.matchAll({ type: 'window', includeUncontrolled: true }).then(() => {
//       return clients.openWindow(targetUrl)
//     })
//   )
// })
//
//
//
//
//
//
// export default ({ app }, inject) => {
//   console.log(app.firebase)
// }

// import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'
// import { initializeApp } from 'firebase/app'
// import { getMessaging, onMessage } from 'firebase/messaging'

// const firebaseApp = initializeApp(firebaseConfig)

// const messaging = getMessaging(firebaseApp)
// onMessage(messaging, (payload) => {
//   console.log('event: onMessage')
//   console.log('    ', payload)
// })

// onBackgroundMessage(messaging, (payload) => {
//   console.log('event: onBackgroundMessage')
//   console.log('    ', payload)
// })

// import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw'
// export default ({ app }, inject) => {
//   console.log('TEST')
//   const firebaseApp = app.firebase

//   const messaging = getMessaging(firebaseApp)

//   onBackgroundMessage(messaging, (payload) => {
//     console.log('event: onBackgroundMessage')
//     console.log('    ', payload)
//   })
// }

// 位置情報取得案
// self.addEventListener('push', (event) => {
//   event.waitUntil(
//     new Promise((resolve, reject) => {
//       if ('geolocation' in navigator) {
//         // ユーザーの現在位置を取得
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const Latitude = position.coords.latitude
//             const Longitude = position.coords.longitude
//             console.log('Latitude:', Latitude)
//             console.log('Longitude:', Longitude)

//             const apiUrl = 'https://your-api.example.com/endpoint'
//             const pushData = { Latitude, Longitude }
//             const fetchData = {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(pushData),
//             }

//             fetch(apiUrl, fetchData)
//               .then((response) => resolve(response))
//               .catch((error) => reject(error))
//           },
//           (error) => {
//             console.error('Error getting location:', error)
//             reject(error)
//           }
//         )
//       } else {
//         console.error('Geolocation is not available in this browser.')
//         reject(new Error('Geolocation is not available in this browser.'))
//       }
//     })
//   )
// })

// selfとは、Service Workerのコンテキストを参照するために使用されるキーワードです。Service Workerは、ウェブページとは別のスコープで実行されるため、通常のウェブページで使用されるwindowオブジェクトにはアクセスできません。その代わりに、Service WorkerのグローバルスコープはServiceWorkerGlobalScopeという別のオブジェクトで表され、selfを使ってそのスコープにアクセスできます。

// selfを使用することで、Service Workerのスコープ内でリスナーやAPIにアクセスできます。たとえば、self.addEventListenerでService Worker内で発生するイベントのリスナーを追加できます。また、self.registrationやself.clientsを使って、Service Workerの登録情報やクライアントに関する情報にアクセスできます。

// 以下にいくつかの例を示します。

// javascript
// Copy code
// // Service Workerのインストールイベントのリスナーを追加
// self.addEventListener('install', (event) => {
//   // インストール時の処理
// });

// // Service Workerのアクティベーションイベントのリスナーを追加
// self.addEventListener('activate', (event) => {
//   // アクティベーション時の処理
// });

// // クライアントに対してメッセージを送信
// self.clients.matchAll().then((clients) => {
//   clients.forEach((client) => {
//     client.postMessage('Hello from the Service Worker!');
//   });
// });
// selfはService Workerのコンテキストでグローバルに利用できるため、selfを使用せずにaddEventListenerやclientsなどのAPIを直接呼び出すこともできますが、selfを使うことで、コードがService Workerのコンテキストで実行されていることを明示的に示すことができます。

// addEventListenerのpushイベントを使用して、自作APIにリクエストを実行することができます。pushイベントは、サーバーからプッシュ通知を受信したときに発生します。pushイベントのリスナー内でFetch APIを使用して、自作APIにリクエストを送信できます。

// 以下に例を示します。

// javascript
// Copy code
// self.addEventListener('push', (event) => {
//   const apiUrl = 'https://your-api.example.com/endpoint';
//   const fetchData = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ data: 'your data' })
//   };

//   // Fetch APIを使って自作APIにリクエストを送信
//   fetch(apiUrl, fetchData)
//     .then((response) => {
//       // レスポンスの処理
//     })
//     .catch((error) => {
//       // エラー処理
//     });
// });
// この例では、pushイベントが発生したときに、Fetch APIを使用して自作APIにリクエストを送信しています。リクエストの詳細（HTTPメソッド、ヘッダー、ボディなど）は、fetchDataオブジェクトで定義しています。Fetch APIはプロミスベースであるため、.then()と.catch()を使用してレスポンスとエラーを処理します。

// addEventListenerは、ブラウザやService Worker内で発生するさまざまなイベントを監視するために使用されるJavaScript関数です。以下に、addEventListenerで監視できる主なイベントの例をいくつか示します。

// install: Service Workerのインストール時に発生します。このイベントは、Service Workerが最初に登録されたときや、更新があったときに発生します。主に、キャッシュの初期化やリソースのプリキャッシュなど、Service Workerの初期設定に使用されます。

// javascript
// Copy code
// self.addEventListener('install', (event) => {
//   // キャッシュの初期化やリソースのプリキャッシュなど
// });
// activate: Service Workerがアクティブになったときに発生するイベントです。主に、古いキャッシュの削除やリソースの更新など、Service Workerのバージョン管理に使用されます。

// javascript
// Copy code
// self.addEventListener('activate', (event) => {
//   // 古いキャッシュの削除やリソースの更新など
// });
// fetch: ブラウザがリソースを取得しようとしたときに発生するイベントです。これを利用して、Service Workerがキャッシュの制御やオフラインサポートなどを実装できます。

// javascript
// Copy code
// self.addEventListener('fetch', (event) => {
//   // キャッシュの制御やオフラインサポートなど
// });
// push: プッシュ通知がサーバーから受信されたときに発生するイベントです。このイベントを使用して、Service Workerがバックグラウンドでプッシュ通知を処理できます。

// javascript
// Copy code
// self.addEventListener('push', (event) => {
//   // プッシュ通知の処理
// });
// notificationclick: 通知がクリックされたときに発生するイベントです。これを利用して、通知クリック時の挙動をカスタマイズできます。

// javascript
// Copy code
// self.addEventListener('notificationclick', (event) => {
//   // 通知クリック時の挙動
// });
// sync: バックグラウンドでの定期的なデータ同期を行うためのイベントです。例えば、オフラインで作成されたデータをバックグラウンドでサーバーに同期させることができます。

// javascript
// Copy code
// self.addEventListener('sync', (event) => {
//   // データ同期の処理
// });
// 上記は、addEventListenerで監視できるイ

// User
// 続きをお願いします。
// ChatGPT
// 上記に挙げたイベントは、addEventListenerで監視できるイベントの一部です。他にも様々なイベントがありますが、以下にいくつかの例を示します。

// message: Service Workerとページ間でメッセージがやり取りされたときに発生するイベントです。これを使用して、Service Workerとページが互いにデータを送受信できます。

// javascript
// Copy code
// self.addEventListener('message', (event) => {
//   // メッセージの処理
// });
// beforeinstallprompt: ブラウザがアプリのインストールを促すプロンプトを表示する直前に発生するイベントです。このイベントを使用して、インストールプロンプトの表示タイミングを制御できます。

// javascript
// Copy code
// window.addEventListener('beforeinstallprompt', (event) => {
//   // インストールプロンプトの表示タイミングを制御
// });
// readystatechange: ドキュメントの読み込み状態が変更されたときに発生するイベントです。これを使用して、ページの読み込み状態に応じて処理を実行できます。

// javascript
// Copy code
// document.addEventListener('readystatechange', (event) => {
//   // ページの読み込み状態に応じた処理
// });
// onlineとoffline: ブラウザのオンラインとオフライン状態の変化を検出するイベントです。これらのイベントを使用して、接続状態に応じた処理を実行できます。

// javascript
// Copy code
// window.addEventListener('online', (event) => {
//   // オンライン状態になったときの処理
// });

// window.addEventListener('offline', (event) => {
//   // オフライン状態になったときの処理
// });
// これらのイベントは、addEventListenerを使用して監視し、それぞれのイベントに対応する処理を実行することができます。
