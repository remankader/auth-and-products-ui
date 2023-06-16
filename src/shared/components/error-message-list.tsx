function ErrorMessageList({ errorMessageList }: { errorMessageList: [] }) {
  return (
    <>
      {errorMessageList.length ? (
        <div>
          <div
            className="p-4 
            mb-4 
            text-sm
            text-rose-700
            bg-rose-100  
            rounded-lg"
            role="alert"
          >
            <ul>
              {errorMessageList.map((each: any, k: number) => {
                return (
                  <li key={k} className="bulletListItem">
                    <span>{each.msg || "Something went wrong"}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ErrorMessageList;
