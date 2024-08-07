// const Forms = () => {
//   return (
//     <div></div>
//     // <div className="flex items-center justify-center min-h-screen">
//     //   <div className="w-full p-6 bg-white rounded-md shadow-xl mt-5 mb-12">
//     //     <form action="#" method="POST">
//     //       <div className="mb-4">
//     //         <label for="email" className="block text-sm font-medium text-gray-700">
//     //           Email Address
//     //         </label>
//     //         <input
//     //           type="email"
//     //           id="email"
//     //           name="email"
//     //           required
//     //           className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//     //         />
//     //       </div>
//     //       <div className="mb-6">
//     //         <label
//     //           for="message"
//     //           className="block text-sm font-medium text-gray-700"
//     //         >
//     //           Message
//     //         </label>
//     //         <textarea
//     //           id="message"
//     //           name="message"
//     //           rows="4"
//     //           required
//     //           className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
//     //         ></textarea>
//     //       </div>
//     //       <div className="flex justify-center">
//     //         <button
//     //           type="submit"
//     //           className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//     //         >
//     //           Submit
//     //         </button>
//     //       </div>
//     //     </form>
//     //   </div>
//     // </div>
//   );
// };

export const ContactUsForm = () => {
  return (
    <form className="">
      <div className="mb-5">
        <label
          for="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div className="mb-5">
        <label
          for="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label
          for="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
      >
        Submit
      </button>
    </form>
  );
};
