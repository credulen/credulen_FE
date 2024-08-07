const Conferences = () => {
  return (
    <div className="md:mt-32 mt-36 md:px-[5rem] px-4">
      <div className="pb-20">
        <h1 className="text-3xl font-semibold">Events You will Love</h1>

        <div className="flex justify-center">
          <a
            href="#"
            class="block p-6 w-60 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-12"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              Coming Soon
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-center">
              Stay Tuned...
            </p>
          </a>
        </div>

        <div className="pt-20">
          <hr class="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
          <h1 className="text-2xl font-semibold">Past Events</h1>
          <hr class="h-px my-3 bg-gray-300 border-0 dark:bg-gray-700"></hr>
        </div>

        <div className="flex justify-center">
          <a
            href="#"
            class="block p-6 w-60 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mt-12"
          >
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex justify-center">
              Coming Soon
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 flex justify-center">
              Stay Tuned...
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Conferences;
