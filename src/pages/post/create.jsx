import { contentPostValidator, titlePostValidator } from "@/utils/validators"
import { Formik, Field} from "formik"
import Button from "@/web/components/ui/Button"
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
  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post("http://localhost:3000/api/posts", values)

      resetForm()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" placeholder="Enter a title" label="Title" />
        <Field
          name="content"
          placeholder="Enter content"
          component="textarea"
          row="6"
          className="border-2 p-2 rounded-lg"
        />
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </Button>
      </Form>
    </Formik>
  )
}

export default CreatePostPage
