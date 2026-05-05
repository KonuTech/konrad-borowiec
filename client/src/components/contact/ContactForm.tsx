import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { insertContactSchema } from '@shared/types';
import { api } from '@/lib/staticApi';

// Extend the base schema with more validations
const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await api.contact.create(data);
      toast({
        title: t('toast.sent'),
        description: t('toast.success'),
        variant: 'default',
      });
      reset();
    } catch (error) {
      toast({
        title: t('toast.error'),
        description: t('toast.failed'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          {t('contact.labels.name')}
        </label>
        <input
          type="text"
          id="name"
          {...register('name')}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-portfolio-primary dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-portfolio-lighter"
          placeholder={t('contact.labels.name')}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          {t('contact.labels.email')}
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-portfolio-primary dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-portfolio-lighter"
          placeholder={t('contact.labels.email')}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {t('contact.labels.message')}
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={5}
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-portfolio-primary dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-portfolio-lighter"
          placeholder={t('contact.labels.message')}
        ></textarea>
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="font-nunito w-full transform rounded-lg bg-portfolio-primary py-3 font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-portfolio-dark hover:shadow-lg disabled:transform-none disabled:opacity-70"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t('ui.toggle')}
          </span>
        ) : (
          t('contact.send')
        )}
      </button>
    </form>
  );
};

export default ContactForm;
