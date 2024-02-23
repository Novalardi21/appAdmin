export default function ({ redirect, app }) {
  const authToken = app.$cookies.get("AdminToken");
  if (!authToken) {
    return redirect("/");
  }
}
