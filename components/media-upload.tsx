'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MediaUploadProps {
  locale: string;
}

export function MediaUpload({ locale }: MediaUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      // TODO: Implement Cloudinary upload
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated upload
      
      toast.success(
        locale === 'bn' ? 'সফলভাবে আপলোড হয়েছে' : 'Upload successful'
      );
      
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(
        locale === 'bn' ? 'আপলোড ব্যর্থ হয়েছে' : 'Upload failed'
      );
    } finally {
      setUploading(false);
    }
  };

  // Only show for authenticated volunteers (placeholder)
  // return null;

  return (
    <Card className="p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {locale === 'bn' ? 'মিডিয়া আপলোড করুন' : 'Upload Media'}
      </h2>
      
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <Label htmlFor="file">
            {locale === 'bn' ? 'ছবি বা ভিডিও নির্বাচন করুন' : 'Select Image or Video'}
          </Label>
          <div className="mt-2">
            {preview ? (
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                {file?.type.startsWith('video') ? (
                  <video src={preview} className="w-full h-full object-contain" controls />
                ) : (
                  <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                )}
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <label className="border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  {locale === 'bn' ? 'ক্লিক করে ফাইল নির্বাচন করুন' : 'Click to select file'}
                </span>
                <Input
                  id="file"
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>

        {file && (
          <>
            <div>
              <Label htmlFor="title">
                {locale === 'bn' ? 'শিরোনাম' : 'Title'}
              </Label>
              <Input id="title" placeholder={locale === 'bn' ? 'শিরোনাম লিখুন' : 'Enter title'} />
            </div>

            <div>
              <Label htmlFor="description">
                {locale === 'bn' ? 'বর্ণনা' : 'Description'}
              </Label>
              <Textarea
                id="description"
                placeholder={locale === 'bn' ? 'বর্ণনা লিখুন' : 'Enter description'}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="category">
                {locale === 'bn' ? 'ক্যাটেগরি' : 'Category'}
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={locale === 'bn' ? 'নির্বাচন করুন' : 'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="martyrs">{locale === 'bn' ? 'শহীদদের' : 'Martyrs'}</SelectItem>
                  <SelectItem value="protests">{locale === 'bn' ? 'আন্দোলন' : 'Protests'}</SelectItem>
                  <SelectItem value="youth">{locale === 'bn' ? 'তারুণ্য' : 'Youth'}</SelectItem>
                  <SelectItem value="campaign">{locale === 'bn' ? 'প্রচারণা' : 'Campaign'}</SelectItem>
                  <SelectItem value="general">{locale === 'bn' ? 'সাধারণ' : 'General'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {locale === 'bn' ? 'আপলোড হচ্ছে...' : 'Uploading...'}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {locale === 'bn' ? 'আপলোড করুন' : 'Upload'}
                </>
              )}
            </Button>
          </>
        )}
      </form>
    </Card>
  );
}
