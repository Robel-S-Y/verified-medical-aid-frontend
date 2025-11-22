import { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';


export default function ViewModal({ isOpen, onClose, viewData }) {
  const location = useLocation();
  // locationname = location.pathname.replace("/", "");

  const isUser = () => location.pathname === "/Users";
  const isBooks = () => location.pathname === "/books";
  const isGenres = () => location.pathname === "/genres";

  const navigate = useNavigate();

const handleMoreClick = () => {
  if (!viewData?.id) return;
  const basePath = isBooks() ? "books" : isUser() ? "Users" : isGenres() ? "genres" : "members";
  navigate(`/${basePath}/${viewData.id}`);
};


  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-lg translate-y-0 translate-x-0 rounded-lg bg-white p-6 shadow-lg sm:max-w-[425px]"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
          <span className="sr-only">Close</span>
        </button>

        {/* Header */}
        <div className="mb-4 text-center sm:text-left">
          <h2 className="text-lg font-semibold capitalize">
            {viewData?.name || viewData?.title || viewData?.username}
          </h2>
          <p className="text-sm text-gray-600">
            {isBooks() ? "Book" : isUser() ? "User" : "Member"} Details
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-4 py-4">
          {isBooks() && (
            <>
              <Row label="Author" value={viewData.author} />
              <Row label="Genre" badge={viewData.genre.name} />
              <Row label="Published" value={viewData.published_year} />
              <Row label="Available" badge={`${viewData.available_copies} copies`} />
              <Row label="Status" badge={viewData.available_copies > 0 ? "Available" : "Unavailable"} />
            </>
          )}

          {isUser() && (
            <>
              <Row label="Name" value={viewData.name} icon="user" />
              <Row label="Email" value={viewData.email} icon="Mail" />
              <Row label="Phone" value={viewData.phone} icon="Phone" />
              <Row label="Role" badge={viewData.role?.toUpperCase()} icon="shield" badgeType="destructive" />
            </>
          )}

          {!isBooks() && !isUser() && (
            <>
              <Row label="Name" value={viewData.name} />
              <Row label="Email" value={viewData.email}  />
              <Row label="Phone" value={viewData.phone}  />
              <Row label="Joined" value={viewData.join_date} />
              <Row label="Active Borrows" badge={`${viewData.borrowed_count || 0} books`} />
            </>
          )}
        </div>
        {!isUser() && (
            <div className="flex justify-end mt-4">
            <button
            onClick={handleMoreClick}
            className="rounded-md bg-black px-4 py-2 text-sm text-white hover:opacity-80"
            >
            More
            </button>
            </div>)}
      </div>
    </div>
  );
}

function Row({ label, value, badge, icon, badgeType }) {
  const icons = {
    user: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="lucide lucide-user mr-2 h-5 w-5 text-blue-500">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),

    mail: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="lucide lucide-mail mr-2 h-5 w-5 text-purple-500">
        <rect width="20" height="16" x="2" y="4" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),

    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="lucide lucide-phone mr-2 h-5 w-5 text-green-600">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8 10.91a16 16 0 0 0 6 6l2.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),

    shield: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="lucide lucide-shield mr-2 h-5 w-5 text-red-500">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 
                1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      </svg>
    ),

    calendar: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="lucide lucide-calendar mr-2 h-5 w-5 text-orange-500">
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <line x1="16" x2="16" y1="2" y2="6"/>
        <line x1="8" x2="8" y1="2" y2="6"/>
        <line x1="3" x2="21" y1="10" y2="10"/>
      </svg>
    )
  };

  const Icon = icons[icon?.toLowerCase()] || null;

  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <span className="font-medium w-fit">{label}:</span>

      <span className="col-span-1 flex w-fit items-center">
        {Icon}

        {badge ? (
          <div
            className={`text-white bg-black inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors 
              ${badgeType === "destructive"
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"}`}
          >
            {badge}
          </div>
        ) : (
          value
        )}
      </span>
    </div>
  );
}

