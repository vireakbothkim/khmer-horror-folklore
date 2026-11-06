import EntryFieldCard from "./EntryFieldCard";
import { englishFields, khmerFields } from "../lib/entry-form-fields";

// English card on the left, Khmer card on the right on desktop. Both cards span
// the same rows, so each English field sits beside its Khmer partner.
// On phones the cards stack, English first.
export default function EntryFieldCards({ formData, fieldErrors, onChange }) {
  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-0">
      <EntryFieldCard
        title="English"
        lang="en"
        fields={englishFields}
        formData={formData}
        fieldErrors={fieldErrors}
        onChange={onChange}
        className="md:col-start-1"
      />
      <EntryFieldCard
        title="ភាសាខ្មែរ"
        lang="km"
        fields={khmerFields}
        formData={formData}
        fieldErrors={fieldErrors}
        onChange={onChange}
        className="md:col-start-2"
      />
    </div>
  );
}
