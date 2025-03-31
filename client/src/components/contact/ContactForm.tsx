import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { insertContactSchema } from '@shared/schema';

// Extend the base schema with more validations
const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
        variant: "default",
      });
      reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    contactMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
        <input 
          type="text" 
          id="name" 
          {...register('name')}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-ghibli-purple dark:focus:ring-ghibli-lightPink transition-colors duration-300"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
        <input 
          type="email" 
          id="email"
          {...register('email')}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-ghibli-purple dark:focus:ring-ghibli-lightPink transition-colors duration-300"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
        <textarea 
          id="message"
          {...register('message')}
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-ghibli-purple dark:focus:ring-ghibli-lightPink transition-colors duration-300"
          placeholder="I'd like to discuss a project..."
        ></textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
      
      <button 
        type="submit"
        disabled={contactMutation.isPending}
        className="w-full py-3 bg-gradient-to-r from-ghibli-blue to-ghibli-purple text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-nunito font-bold disabled:opacity-70 disabled:transform-none"
      >
        {contactMutation.isPending ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : "Send Message"}
      </button>
    </form>
  );
};

export default ContactForm;
