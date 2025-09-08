import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getLastPathSegment = (path: string) => {
  const segments = path.split('/');
  const lastSegment = segments.pop();

  if(!lastSegment){
    return "";
  }

  const formattedSegment = lastSegment.split('-').map(word => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  return formattedSegment.join(' ');
};