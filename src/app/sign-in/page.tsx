import InputLabel from "@/components/label";
import Input from "@/components/input";
import Button from "@/components/button";

export default function SignIn() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <InputLabel htmlFor="email" title="Email address" />
            <Input id="email" name="email" type="email" required autoComplete="email" className="mt-2" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <InputLabel htmlFor="password" title="Password" />

              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <Input id="password" name="password" type="password" required autoComplete="current-password" className="mt-2" />
          </div>

          <Button title="Sign in" type="submit" />

        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  )
}
