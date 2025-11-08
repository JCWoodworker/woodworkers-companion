import { Redirect } from 'expo-router';

/**
 * Root index - redirects to home screen
 */
export default function Index() {
  return <Redirect href="/home" />;
}

