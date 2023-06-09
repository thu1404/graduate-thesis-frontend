export default function ({ store, redirect}) {
  // If the user is not authenticated
  if (!store.state.auth.loggedIn) {
    console.log('ddd');
    return redirect('/login');
  } else {
    console.log('fff');
    return redirect('/');
  }

}
