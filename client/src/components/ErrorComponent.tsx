function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-4xl font-bold text-gray-400 pt-20 p-2">
        Oops! Page not found.
      </p>
      <img
        src="https://image.freepik.com/free-vector/404-error-abstract-concept-illustration_335657-2243.jpg"
        alt="404 error illustration"
        className="h-1/2 w-auto"
      />
    </div>
  );
}

export default PageNotFound;
