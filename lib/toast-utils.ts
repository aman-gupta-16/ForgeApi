import { toast } from "@/hooks/use-toast";

// Common toast patterns
export const showToast = {
  success: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  },
  
  error: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  },
  
  warning: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  },
  
  info: (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  }
};

// Handle API errors and show appropriate toasts
export const handleApiError = (error: any, defaultMessage = "An error occurred") => {
  let title = "Error";
  let description = defaultMessage;

  if (error?.data?.message) {
    description = error.data.message;
  } else if (error?.message) {
    description = error.message;
  } else if (typeof error === 'string') {
    description = error;
  }

  // Handle specific HTTP status codes
  if (error?.status) {
    switch (error.status) {
      case 400:
        title = "Invalid Request";
        description = error?.data?.message || "Please check your input and try again";
        break;
      case 401:
        title = "Authentication Required";
        description = error?.data?.message || "Please sign in to continue";
        break;
      case 403:
        title = "Access Denied";
        description = error?.data?.message || "You don't have permission to perform this action";
        break;
      case 404:
        title = "Not Found";
        description = error?.data?.message || "The requested resource was not found";
        break;
      case 409:
        title = "Conflict";
        description = error?.data?.message || "This action conflicts with existing data";
        break;
      case 422:
        title = "Validation Error";
        description = error?.data?.message || "Please check your input data";
        break;
      case 429:
        title = "Rate Limited";
        description = error?.data?.message || "Too many requests. Please try again later";
        break;
      case 500:
        title = "Server Error";
        description = error?.data?.message || "Something went wrong on our end. Please try again";
        break;
      case 503:
        title = "Service Unavailable";
        description = error?.data?.message || "The service is temporarily unavailable";
        break;
      default:
        if (error.status >= 500) {
          title = "Server Error";
          description = error?.data?.message || "Something went wrong on our end";
        } else if (error.status >= 400) {
          title = "Request Error";
          description = error?.data?.message || "There was a problem with your request";
        }
    }
  }

  showToast.error(title, description);
};

// Handle success responses
export const handleApiSuccess = (message: string, description?: string) => {
  showToast.success(message, description);
};

// Loading toast with promise
export const showLoadingToast = (message: string) => {
  return toast({
    title: message,
    description: "Please wait...",
  });
};