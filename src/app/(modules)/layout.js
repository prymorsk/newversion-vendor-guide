import '@/app/globals.css'
import Navbar from './Navbar';
import { getSiteSetting,getCategories } from '@/app/lib/server-api';

export default async function ModuleLayout({ children }) {
  const sitesetting = await getSiteSetting();
  const categories = await getCategories();
  return (
    <Navbar categories={categories}  sitesetting={sitesetting.data}>{children}</Navbar>
  )
}
