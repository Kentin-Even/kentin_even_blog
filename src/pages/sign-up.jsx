import {
  emailValidator,
  passwordValidator,
  usernameValidator,
} from "@/utils/validators"
import Alert from "@/web/components/ui/Alert"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import Link from "@/web/components/ui/Link"
import SubmitButton from "@/web/components/ui/SubmitButton"
import apiClient from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { object } from "yup"

const initialValues = {
  username: "",
  email: "",
  password: "",
}
const validationSchema = object({
  email: emailValidator.label("E-mail"),
  username: usernameValidator.label("Username"),
  password: passwordValidator.label("Password"),
})
const SignUpPage = () => {
  const { isSuccess, mutateAsync } = useMutation({
    mutationFn: (values) => apiClient.post("/users", values),
  })
  const handleSubmit = async (values) => {
    await mutateAsync(values)

    return true
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-4">
        <Alert variant="success">
          Your account has been created successfully.
        </Alert>
        <p>
          <Link href="/sign-in">Go to sign-in page.</Link>
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form>
            <FormField
              name="username"
              type="text"
              placeholder="Enter your username"
              label="Username"
            />
            <FormField
              name="email"
              type="email"
              placeholder="Enter your e-mail"
              label="E-mail"
            />
            <FormField
              name="password"
              type="password"
              placeholder="Enter your password"
              label="Password"
            />
            <SubmitButton className="mt-4 w-full">Sign Up</SubmitButton>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default SignUpPage
