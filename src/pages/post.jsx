import { contentPostValidator, titlePostValidator } from "@/utils/validators"
import { Formik, ErrorMessage } from "formik"
import { object } from "yup"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import axios from "axios"

const initialValues = {
  title: "",
  content: "",
}
const validationSchema = object({
  title: titlePostValidator.label("Title"),
  content: contentPostValidator.label("Content"),
})
const CreatePostPage = () => {
  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus },
  ) => {
    try {
      // eslint-disable-next-line no-console
      console.log(values)
      await axios.post("http://localhost:3000/api/posts", values)
      resetForm()
    } catch (error) {
      setStatus({ error: "Failed to create post. Please try again later." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" placeholder="Enter a title" />

        <FormField name="content" placeholder="Enter content" />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>

        <ErrorMessage name="error" component="div" className="text-red-500" />
      </Form>
    </Formik>
  )
}

export default CreatePostPage
