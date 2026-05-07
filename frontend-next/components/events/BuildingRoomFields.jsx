"use client";

import { SJSU_LOCATIONS } from "@/lib/locations";

export default function BuildingRoomFields({
  building,
  onBuildingChange,
  room,
  onRoomChange,
  buildingRequired = true,
}) {
  return (
    <>
      <div className="form-group">
        <label>Building</label>
        <select
          value={building}
          onChange={(e) => onBuildingChange(e.target.value)}
          required={buildingRequired}
        >
          <option value="">Select a building…</option>
          {SJSU_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Room (optional)</label>
        <input
          type="text"
          value={room}
          onChange={(e) => onRoomChange(e.target.value)}
          placeholder="e.g. 189"
        />
      </div>
    </>
  );
}
