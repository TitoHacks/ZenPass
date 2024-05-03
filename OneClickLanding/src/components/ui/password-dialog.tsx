import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { storeEntry } from "@/utils/utils";
import { Input } from "@/components/ui/input";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
function PasswordDialog() {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    title: z.string().min(3, {
      message: "Title must be at least 3 characters.",
    }),
    username: z.string().min(1, {
      message: "Username must be at least 1 characters.",
    }),
    password: z.string().min(3, {
      message: "Password must be at least 3 characters.",
    }),
    url: z.string().min(3, {
      message: "Url must be at least 3 characters.",
    }),
  });

  const passwordForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      username: "",
      password: "",
      url: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof formSchema>,
    onClose: () => void
  ) {
    setLoading(true);
    let passwordObj = {
      title: values.title,
      username: values.username,
      password: values.password,
      url: values.url,
    };
    let entryMsg = await (await storeEntry(passwordObj)).text();
    toast.success(entryMsg);
    setLoading(false);
    onClose();
  }

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            Add credential
          </ModalHeader>
          <ModalBody>
            <Form {...passwordForm}>
              <form
                onSubmit={passwordForm.handleSubmit((values) =>
                  onSubmit(values, onClose)
                )}
                className="space-y-8 p-8 backdrop-blur-lg bg-white rounded-lg w-100 "
              >
                <FormField
                  control={passwordForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Facebook account"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email / Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@example.com"
                          type="string"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Contraseñasupersegura123"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.facebook.com"
                          type="string"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row justify-end">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" isLoading={loading} startContent={<FontAwesomeIcon icon={faCheck} />}>
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </ModalBody>
        </>
      )}
    </ModalContent>
  );
}

export default PasswordDialog;
