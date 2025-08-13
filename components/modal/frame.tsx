type modalProps = {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
};

export function Frame({ header, body, footer }: modalProps) {
  return (
    <div className="fixed inset-0 z-50 top-0 bottom-0 flex items-center justify-center bg-black/60">
      <div className="w-4/5 overflow-hidden bg-white rounded-lg shadow-lg md:w-96">
        {header && (
          <div className="flex flex-col items-center py-10  gap-2.5 rounded-t-lg p-6">
            {header}
          </div>
        )}

        <div className=" flex flex-col gap-2.5">{body}</div>

        {footer && (
          <div className=" p-4 flex gap-2.5 rounded-b-lg">{footer}</div>
        )}
      </div>
    </div>
  );
}
