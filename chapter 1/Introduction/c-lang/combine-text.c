// Now, let's port each program to the other language and platform.
//  First, from the preceding combine-text.js, let's write C code.
const char *s1 = "first string";
const char *s2 = "second string";
int size = strlen(s1) + strlen(s2);
char *buffer = (char *)malloc(size + 1); // One more for the 0x00 byte that
terminates strings
strcpy(buffer, s1);
strcat(buffer, s2);
free(buffer); // Never forget to free memory!