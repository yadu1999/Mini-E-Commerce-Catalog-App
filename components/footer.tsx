import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mini E-Commerce Catalog App</h3>
            <p className="text-gray-400">Your one-stop shop for amazing products at great prices.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/products?category=smartphones" className="hover:text-white transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=laptops" className="hover:text-white transition-colors">
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/products?category=furniture" className="hover:text-white transition-colors">
                  Furniture
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">
              Email: supportminiPayment@estore.com
              <br />
              Phone: (620) 123-4567
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Mini E-Commerce Catalog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
