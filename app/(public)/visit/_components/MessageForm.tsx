'use client';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { use3DModel } from '@/app/(public)/visit/[userId]/store/modelStore';

const formSchema = z.object({
  message: z.string().min(1).max(500),
  author: z.string().min(1).max(10),
});

const MessageForm = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { setMessage } = use3DModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
      author: '',
    },
  });

  const onSubmit = (value: z.infer<typeof formSchema>) => {
    console.log(value);
    router.replace(`/visit/${userId}`);
    sessionStorage.setItem('messageIsDecorated', 'true');
    sessionStorage.setItem('visitToast', 'true');
  };

  return (
    <Form {...form}>
      <div />
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="pointer-events-auto space-y-8"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="w-full"
                  placeholder="메세지를 입력해주세요."
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length > 500) {
                      return;
                    }

                    setMessage({ message: value });
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className="w-full" placeholder="보내는 이" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" variant={'outline'} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default MessageForm;
