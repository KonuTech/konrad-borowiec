import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
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

  // Animation variants for staggered form elements
  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)}
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="mb-6" variants={itemVariants}>
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-ghibli-blue dark:text-ghibli-lightBlue">Your Name</label>
        <div className="relative">
          <input 
            type="text" 
            id="name" 
            {...register('name')}
            className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-gray-700/70 border border-ghibli-lightBlue/20 dark:border-ghibli-blue/30 focus:outline-none focus:ring-2 focus:ring-ghibli-blue dark:focus:ring-ghibli-lightBlue transition-colors duration-300"
            placeholder="John Doe"
          />
          <span className="absolute left-3 top-3 text-ghibli-blue/70 dark:text-ghibli-lightBlue/70">
            <i className="fas fa-user"></i>
          </span>
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </motion.div>
      
      <motion.div className="mb-6" variants={itemVariants}>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-ghibli-blue dark:text-ghibli-lightBlue">Your Email</label>
        <div className="relative">
          <input 
            type="email" 
            id="email"
            {...register('email')}
            className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-gray-700/70 border border-ghibli-lightBlue/20 dark:border-ghibli-blue/30 focus:outline-none focus:ring-2 focus:ring-ghibli-blue dark:focus:ring-ghibli-lightBlue transition-colors duration-300"
            placeholder="john@example.com"
          />
          <span className="absolute left-3 top-3 text-ghibli-blue/70 dark:text-ghibli-lightBlue/70">
            <i className="fas fa-envelope"></i>
          </span>
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </motion.div>
      
      <motion.div className="mb-8" variants={itemVariants}>
        <label htmlFor="message" className="block text-sm font-medium mb-2 text-ghibli-blue dark:text-ghibli-lightBlue">Your Message</label>
        <div className="relative">
          <textarea 
            id="message"
            {...register('message')}
            rows={5}
            className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-50 dark:bg-gray-700/70 border border-ghibli-lightBlue/20 dark:border-ghibli-blue/30 focus:outline-none focus:ring-2 focus:ring-ghibli-blue dark:focus:ring-ghibli-lightBlue transition-colors duration-300"
            placeholder="I'd like to discuss a project..."
          ></textarea>
          <span className="absolute left-3 top-3 text-ghibli-blue/70 dark:text-ghibli-lightBlue/70">
            <i className="fas fa-comment-alt"></i>
          </span>
        </div>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <motion.button 
          type="submit"
          disabled={contactMutation.isPending}
          className="w-full py-3 bg-gradient-to-r from-ghibli-blue to-ghibli-pink text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-nunito font-bold disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.98 }}
        >
          {contactMutation.isPending ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Send Message
              <motion.i 
                className="fas fa-paper-plane ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              />
            </span>
          )}
        </motion.button>
      </motion.div>
    </motion.form>
  );
};

export default ContactForm;
